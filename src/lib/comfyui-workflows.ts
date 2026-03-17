/**
 * ComfyUI workflow templates for ThinkDiffusion.
 *
 * These are JSON templates that can be sent to the ComfyUI /prompt API.
 * The LoRA model name should be updated after training.
 *
 * Usage:
 *   const workflow = buildLandscapeWorkflow({ prompt: "...", loraName: "mundo-dos-veus-v1" });
 *   fetch(`${comfyuiUrl}/prompt`, { method: "POST", body: JSON.stringify({ prompt: workflow }) });
 */

const BASE_NEGATIVE =
  "text, watermark, signature, logo, words, letters, face, facial features, realistic face, photographic, blurry, low quality, deformed, ugly, nsfw";

const BASE_STYLE_SUFFIX =
  "editorial illustration, dark atmospheric, deep navy blue (#1A1A2E) background, terracotta (#C4745A) and gold (#C9A96E) tones, violet (#8B5CF6) accents, poetic, cinematic lighting, warm golden light, painterly";

type WorkflowOpts = {
  prompt: string;
  negativePrompt?: string;
  loraName?: string;
  loraStrength?: number;
  width?: number;
  height?: number;
  seed?: number;
  steps?: number;
  cfg?: number;
  checkpoint?: string;
};

/**
 * Build a landscape/territory generation workflow.
 */
export function buildLandscapeWorkflow(opts: WorkflowOpts) {
  const {
    prompt,
    negativePrompt = BASE_NEGATIVE,
    loraName,
    loraStrength = 0.8,
    width = 1280,
    height = 720,
    seed = Math.floor(Math.random() * 2 ** 32),
    steps = 30,
    cfg = 7,
    checkpoint = "dreamshaperXL_v21TurboDPMSDE.safetensors",
  } = opts;

  const fullPrompt = `${prompt}, ${BASE_STYLE_SUFFIX}`;

  // Base workflow with checkpoint loader → (optional LoRA) → KSampler → decode → save
  const workflow: Record<string, unknown> = {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: checkpoint },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: fullPrompt,
        clip: loraName ? ["3", 1] : ["1", 1],
      },
    },
    "3_neg": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: negativePrompt,
        clip: loraName ? ["3", 1] : ["1", 1],
      },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width, height, batch_size: 1 },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed,
        steps,
        cfg,
        sampler_name: "dpmpp_2m",
        scheduler: "karras",
        denoise: 1,
        model: loraName ? ["3", 0] : ["1", 0],
        positive: ["2", 0],
        negative: ["3_neg", 0],
        latent_image: ["4", 0],
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: {
        samples: ["5", 0],
        vae: ["1", 2],
      },
    },
    "7": {
      class_type: "SaveImage",
      inputs: {
        filename_prefix: "seteveus-landscape",
        images: ["6", 0],
      },
    },
  };

  // Insert LoRA loader if specified
  if (loraName) {
    workflow["3"] = {
      class_type: "LoraLoader",
      inputs: {
        lora_name: loraName,
        strength_model: loraStrength,
        strength_clip: loraStrength,
        model: ["1", 0],
        clip: ["1", 1],
      },
    };
  }

  return workflow;
}

/**
 * Build a silhouette generation workflow with ControlNet (OpenPose).
 */
export function buildSilhouetteWorkflow(
  opts: WorkflowOpts & {
    poseImageBase64?: string;
    controlnetModel?: string;
  }
) {
  const {
    prompt,
    negativePrompt = BASE_NEGATIVE,
    loraName,
    loraStrength = 0.8,
    width = 1280,
    height = 720,
    seed = Math.floor(Math.random() * 2 ** 32),
    steps = 30,
    cfg = 7,
    checkpoint = "dreamshaperXL_v21TurboDPMSDE.safetensors",
    controlnetModel = "controlnet-openpose-sdxl-1.0.safetensors",
  } = opts;

  const fullPrompt = `faceless silhouette figure, terracotta (#C4745A) with golden (#C9A96E) glow, ${prompt}, ${BASE_STYLE_SUFFIX}`;

  const workflow: Record<string, unknown> = {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: checkpoint },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: fullPrompt,
        clip: loraName ? ["lora", 1] : ["1", 1],
      },
    },
    "2_neg": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: `face, facial features, realistic face, ${negativePrompt}`,
        clip: loraName ? ["lora", 1] : ["1", 1],
      },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width, height, batch_size: 1 },
    },
    "cn_loader": {
      class_type: "ControlNetLoader",
      inputs: { control_net_name: controlnetModel },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed,
        steps,
        cfg,
        sampler_name: "dpmpp_2m",
        scheduler: "karras",
        denoise: 1,
        model: loraName ? ["lora", 0] : ["1", 0],
        positive: ["2", 0],
        negative: ["2_neg", 0],
        latent_image: ["4", 0],
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveImage",
      inputs: {
        filename_prefix: "seteveus-silhouette",
        images: ["6", 0],
      },
    },
  };

  if (loraName) {
    workflow["lora"] = {
      class_type: "LoraLoader",
      inputs: {
        lora_name: loraName,
        strength_model: loraStrength,
        strength_clip: loraStrength,
        model: ["1", 0],
        clip: ["1", 1],
      },
    };
  }

  return workflow;
}

/**
 * Territory-specific prompt templates.
 * Each territory has 4 stages matching module progression.
 */
export const TERRITORY_PROMPTS: Record<
  string,
  { name: string; stages: [string, string, string, string] }
> = {
  "ouro-proprio": {
    name: "A Casa dos Espelhos Dourados",
    stages: [
      "dark room with mirrors covered by violet cloth, floor of ancient coins, faint golden light seeping from behind mirrors, mysterious and closed",
      "dark room, some mirrors partially uncovered, distorted reflections visible, golden light growing, coins scattered",
      "room with mirrors revealing clearer reflections, warm golden light filling the space, violet cloths falling away",
      "room of golden mirrors fully uncovered, clear reflections, radiant warm light, coins on the floor like a path, sense of clarity",
    ],
  },
  "sangue-e-seda": {
    name: "A Arvore das Raizes Visiveis",
    stages: [
      "enormous ancient tree with tangled exposed roots, red silk threads wrapped between branches and roots, dark atmosphere, roots intertwined",
      "ancient tree, roots slightly less tangled, red silk threads becoming visible patterns, hints of light through branches",
      "ancient tree with roots reorganizing, red silk threads flowing gracefully, soft dawn light beginning behind the tree",
      "majestic tree with roots purposefully arranged, red silk threads like ribbons, golden dawn light behind the tree, sense of chosen inheritance",
    ],
  },
  "a-arte-da-inteireza": {
    name: "A Ponte entre Duas Margens",
    stages: [
      "transparent violet river between two dark riverbanks, no bridge, two distant shores, misty and separated",
      "violet river, faint bridge of light beginning to form, two shores closer, first connection visible",
      "violet river with bridge of light half-built, two silhouette figures visible on opposite banks, approaching",
      "complete bridge of light over violet river, two whole silhouettes standing with space between them, balanced connection",
    ],
  },
  "depois-do-fogo": {
    name: "O Campo Queimado",
    stages: [
      "burnt black earth, ashes everywhere, charred remains, dark sky, devastation, no life visible",
      "burnt field with tiny green shoots emerging from black soil, ember-orange glow in the ground, first signs of life",
      "field transitioning from ash to growth, green sprouts scattered, some small flowers, warm light breaking through clouds",
      "transformed landscape, new growth different from what was before, wildflowers among fertile dark earth, golden sunrise",
    ],
  },
  "olhos-abertos": {
    name: "A Encruzilhada Infinita",
    stages: [
      "infinite crossroads in dense fog, dozens of paths disappearing into white mist, paralysis, no direction clear",
      "crossroads in thinning fog, some paths becoming slightly visible, distant landmarks emerging",
      "crossroads with fog partially cleared, several clear paths visible, a silhouette standing at the center considering",
      "crossroads with one path clearly chosen, silhouette taking first step, remaining fog gentle not threatening, peaceful clarity",
    ],
  },
  "a-pele-lembra": {
    name: "O Corpo-Paisagem",
    stages: [
      "surreal landscape that suggests body forms, hills like shoulders, rivers like veins, caves like organs, unfamiliar and disconnected, dark",
      "body-landscape becoming recognizable, rivers glowing faintly, hills with warm terracotta tones, first signs of habitation",
      "body-landscape with glowing pathways along rivers-veins, warm light from cave-organs, landscape being explored",
      "fully inhabited body-landscape, warm rosewood tones, every hill and river recognized and loved, golden light throughout",
    ],
  },
  "limite-sagrado": {
    name: "A Muralha que Nasce do Chao",
    stages: [
      "open dark space, violet figures approaching from all sides, no boundary, vulnerability, exposed",
      "open space with a faint golden line growing from the ground, violet figures pausing at the light",
      "golden wall of light rising from the ground, clear boundary, violet figures respecting the distance, a door forming",
      "complete wall of warm golden light with a door the silhouette controls, peaceful boundary, figures welcomed through the door by choice",
    ],
  },
  "flores-no-escuro": {
    name: "O Jardim Subterraneo",
    stages: [
      "deep dark cavern, complete darkness, sense of hidden things below, subterranean emptiness",
      "cavern with first bioluminescent flowers appearing, faint blue and purple glow, each flower a loss becoming visible",
      "cavern garden growing, bioluminescent flowers in many colors, soft light illuminating cave walls, beauty in darkness",
      "cavern fully illuminated by its own flowers, bioluminescent garden, each loss transformed into light, underground beauty",
    ],
  },
  "o-peso-e-o-chao": {
    name: "O Caminho de Pedras",
    stages: [
      "silhouette figure curved under heavy stacked stones, dark path ahead, overwhelming weight, grey stone everywhere",
      "figure still carrying stones but some placed on the ground, path visible with stones left by others, lighter grey",
      "figure standing straighter, many stones placed carefully on the ground, path clearer, warmer tones emerging",
      "figure standing tall and light, stones arranged on the ground like a trail, peaceful stone path, warm light, freedom",
    ],
  },
  "voz-de-dentro": {
    name: "A Sala do Eco",
    stages: [
      "circular room with walls that reflect shadows of unspoken words, dark violet, echoes visible as shadow forms, silence",
      "circular room, shadows becoming less threatening, faint golden echoes appearing among the dark ones",
      "circular room with golden echoes growing stronger, shadows receding, sense of voice finding space",
      "circular room filled with golden light-echoes, shadows transformed into warm resonance, voice and light unified",
    ],
  },
  "o-fio-invisivel": {
    name: "O Lago dos Reflexos Partilhados",
    stages: [
      "still lake with opaque silver-dark surface, no reflections visible, single silhouette alone on the shore, isolation, cold blue-silver tones",
      "lake surface rippling, faint reflections of other figures appearing in the water, thin golden threads beginning to connect them, mysterious",
      "lake becoming transparent, clear reflections of multiple silhouettes from different generations visible, golden threads glowing between reflections",
      "fully transparent lake, individual reflections merging into one collective reflection, golden threads radiant, unity of individual and whole",
    ],
  },
  "o-espelho-do-outro": {
    name: "A Galeria dos Reflexos Vivos",
    stages: [
      "dark gallery with living mirrors showing other peoples faces and forms, silhouette looking outward never at itself, confusion, green-emerald tones",
      "gallery mirrors beginning to show the silhouettes own form mixed with others, partial recognition, emerald and gold emerging",
      "most mirrors clearly reflecting the silhouette with shadows of others behind, integration happening, warm emerald light",
      "clear mirrors showing the silhouette with full clarity, others visible as context not identity, peaceful emerald-gold gallery",
    ],
  },
  "o-silencio-que-grita": {
    name: "A Caverna dos Ecos Mudos",
    stages: [
      "deep silent cavern, walls marked with shadows of unspoken words, total silence, grey-blue tones, ghostly white marks, heaviness",
      "cavern with first visible echoes as grey waves on walls, silhouette with mouth slightly open, fear, faint light emerging",
      "stronger echoes some turning golden, walls vibrating, silhouette speaking with visible sound waves emerging, blue-grey and gold",
      "cavern filled with golden and white echoes, silence transformed into resonance, freed words illuminating the walls, liberation",
    ],
  },
  "a-teia": {
    name: "O Bosque dos Fios Entrelacados",
    stages: [
      "dark forest with tangled threads between trees, silhouette trapped in threads, suffocation, dark moss-green, no light",
      "threads reorganizing, some cut, silhouette with more space, first mossy-golden light filtering through trees",
      "visible organized web, threads connecting without trapping, silhouette at center free, green-golden light throughout forest",
      "beautiful balanced web of golden threads between ancient trees, silhouette connected but whole, luminous moss-green forest, belonging without disappearing",
    ],
  },
  "a-chama": {
    name: "O Vulcao Adormecido",
    stages: [
      "dormant sealed volcano, black cold surface, silhouette rigid with clenched jaw, invisible pressure underneath, dark red undertones",
      "cracks in surface revealing lava underneath, heat rising, silhouette tense but aware, red-orange glow emerging",
      "lava flowing in controlled channels, fire visible but not destructive, silhouette standing with open fists, warm fierce light",
      "active beautiful volcano, lava illuminating the landscape, controlled fire as source of light, powerful silhouette, red and gold",
    ],
  },
  "a-mulher-antes-de-mae": {
    name: "O Ninho que Pesa",
    stages: [
      "enormous nest consuming the silhouette, only the mother visible the woman disappeared, heavy ochre tones, overwhelming",
      "silhouette beginning to emerge from nest, own contour visible, first space between mother and nest, warmer ochre",
      "silhouette both inside and outside the nest, two forms of the same person, warm ochre light, coexistence",
      "beautiful nest with space, whole silhouette mother and woman simultaneously, balance, golden ochre light",
    ],
  },
  "o-oficio-de-ser": {
    name: "A Oficina Infinita",
    stages: [
      "dark workshop with machines running nonstop, silhouette hunched over desk, no window, exhaustion, bronze-dark tones",
      "some machines stopping, silhouette straightening up, a crack of light, first pause, bronze warming",
      "calmer workshop, window half-open, silhouette working at own rhythm, warm bronze light filtering in",
      "workshop with open window, silhouette working and pausing, inside and outside, rhythm, purpose without prison, warm bronze",
    ],
  },
  "o-relogio-partido": {
    name: "O Jardim das Estacoes",
    stages: [
      "garden dominated by giant clock, everything accelerated flowers blooming and dying in seconds, silhouette running, silver-grey anguish",
      "clock cracking, time slowing, some flowers pausing, silhouette slower, amber light beginning",
      "broken clock, seasons coexisting spring and autumn side by side, silhouette standing still observing, amber-silver",
      "no clock, garden with all seasons in harmony, silhouette seated present, peaceful amber-silver light, timeless beauty",
    ],
  },
  "a-coroa-escondida": {
    name: "O Trono Coberto",
    stages: [
      "dark room with throne covered by cloths and shadows, silhouette small and hunched turning away, does not know the throne is hers, purple-dark",
      "cloths slipping off, throne partially visible gold and purple, silhouette looking at it, fear and curiosity",
      "throne uncovered golden and purple, silhouette standing next to it, hesitation, reaching toward it",
      "silhouette seated on throne, crown on head, without permission, golden-purple light, total presence and power",
    ],
  },
  "a-fome": {
    name: "A Mesa Vazia",
    stages: [
      "enormous empty table, silhouette seated in front famished, empty plate, darkness, craving and lack, rosewood-dark",
      "table with some food, silhouette hesitant, conflict between hunger and guilt, weak rosewood light",
      "table with varied food, silhouette eating with attention, no guilt, warm rosy light, presence",
      "beautiful simple table, silhouette at peace with the plate, inhabited body, presence, terracotta and white porcelain, warmth",
    ],
  },
};

/**
 * Silhouette pose descriptions for ControlNet reference.
 */
export const SILHOUETTE_POSES = {
  standing: "standing upright, still, present, arms at sides",
  seated: "sitting cross-legged, reflective, head slightly bowed",
  curved: "bent forward under weight, shoulders hunched, heavy burden",
  heart: "hands on chest, self-connection, eyes closed, gentle",
  open: "arms open wide, palms up, receiving, expansive",
  walking: "mid-stride, moving forward with purpose, determined",
  back: "viewed from behind, contemplating horizon, back to viewer",
  reaching: "one hand extended forward, courage, offering",
  two_together: "two silhouettes close together, connected but distinct",
  two_apart: "two silhouettes with space between them, whole and separate",
  adult_child: "adult silhouette with smaller child silhouette, generational",
  surrounded: "central silhouette surrounded by other figures, community",
  releasing: "hands opening to release something upward, letting go",
  opening_door: "silhouette pushing open a door or lifting a veil, threshold",
} as const;
