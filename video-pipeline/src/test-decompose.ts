#!/usr/bin/env node
/**
 * Test script for the scene decomposer.
 *
 * Validates that the Claude API correctly decomposes a short script
 * into structured cinematic scenes.
 *
 * Usage:
 *   npx tsx src/test-decompose.ts              # Run with Claude API
 *   npx tsx src/test-decompose.ts --dry-run    # Estimate only (no API call)
 */

import { decomposeScript, estimateDecomposition } from './01-scene-decomposer/decomposer.js';

const TEST_SCRIPT = {
  courseId: 'ouro-proprio',
  moduleNumber: 1,
  subLetter: 'A',
  title: 'O medo de olhar',
  perguntaInicial:
    'Quando foi a ultima vez que abriste o teu extracto bancario sem aperto no peito? Sem desviar o olhar. Sem fechar a app depressa. Quando foi a ultima vez que olhaste para os teus numeros como quem olha para a propria cara — sem medo do que ia encontrar?',
  situacaoHumana:
    'E segunda-feira a noite. Estas no sofa. O telefone esta ali, a distancia de um gesto. Sabes que a notificacao do banco chegou ha tres dias. Ainda nao abriste. Nao porque nao tenhas tempo — tens. Nao porque nao saibas — sabes mais ou menos o que esta la. Nao abres porque ha algo no corpo que trava. Uma especie de aperto entre o estomago e o peito, como se abrir aquele ecra fosse abrir uma porta que preferias manter fechada.',
  revelacaoPadrao:
    'O que esta a acontecer nao e preguica. Nao e desorganizacao. E proteccao. O teu corpo aprendeu, em algum momento, que olhar para o dinheiro doi. Que os numeros nao sao neutros — sao um veredicto. Se o saldo esta baixo, diz algo sobre ti. Se esta alto, tambem diz — e talvez te assuste de outra forma.',
  gestoConsciencia:
    'Esta semana, escolhe um momento calmo. Abre o extracto bancario — pode ser do mes passado, nao precisa ser o de hoje. Antes de ler os numeros, poe a mao no peito. Respira. E depois le. Devagar. Sem fazer contas de cabeca, sem planear nada, sem corrigir nada. Apenas le. E nota: o que aparece no corpo? Onde?',
  fraseFinal:
    'O dinheiro nao e o problema. O medo de olhar e que te mantem presa.',
};

async function main(): Promise<void> {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('═══ Scene Decomposer Test ═══\n');
  console.log(`Course: ${TEST_SCRIPT.courseId}`);
  console.log(`Module: ${TEST_SCRIPT.moduleNumber}${TEST_SCRIPT.subLetter}`);
  console.log(`Title: "${TEST_SCRIPT.title}"\n`);

  // Dry run estimate
  const fullText = [
    TEST_SCRIPT.perguntaInicial,
    TEST_SCRIPT.situacaoHumana,
    TEST_SCRIPT.revelacaoPadrao,
    TEST_SCRIPT.gestoConsciencia,
    TEST_SCRIPT.fraseFinal,
  ].join(' ');

  const estimate = estimateDecomposition(fullText);
  console.log(`Word count: ${fullText.split(/\s+/).length}`);
  console.log(`Estimated scenes: ${estimate.estimatedScenes}`);
  console.log(`Estimated tokens: ${estimate.estimatedTokens}`);
  console.log(`Estimated cost: ~$${((estimate.estimatedTokens / 1000) * 0.015).toFixed(3)}\n`);

  if (isDryRun) {
    console.log('[dry-run] Skipping API call.');
    return;
  }

  console.log('Calling Claude API...\n');

  const result = await decomposeScript(TEST_SCRIPT);

  console.log(`Result: ${result.scenes.length} scenes${result.cached ? ' (from cache)' : ''}`);
  if (!result.cached) {
    console.log(`Tokens: ${result.inputTokens} in + ${result.outputTokens} out`);
  }

  console.log('\n─── Scenes ───\n');

  for (const scene of result.scenes) {
    console.log(`[${scene.id}] order=${scene.order} duration=${scene.duration_seconds}s`);
    console.log(`  mood: ${scene.mood} | camera: ${scene.camera} | transition: ${scene.transition}`);
    console.log(`  chars: ${scene.character_refs.length > 0 ? scene.character_refs.join(', ') : 'none'}`);
    console.log(`  narration: "${scene.narration_text.slice(0, 80)}..."`);
    console.log(`  visual: "${scene.visual_prompt.slice(0, 100)}..."`);
    console.log();
  }

  // Validate
  const totalDuration = result.scenes.reduce((sum, s) => sum + s.duration_seconds, 0);
  console.log(`─── Validation ───`);
  console.log(`Total duration: ${totalDuration}s (${(totalDuration / 60).toFixed(1)} min)`);
  console.log(`All scenes have IDs: ${result.scenes.every(s => s.id.startsWith('ouro-proprio-m01'))}`);
  console.log(`All scenes have narration: ${result.scenes.every(s => s.narration_text.length > 0)}`);
  console.log(`All scenes have visual prompts: ${result.scenes.every(s => s.visual_prompt.length > 0)}`);
  console.log(`All durations in range [4-20]: ${result.scenes.every(s => s.duration_seconds >= 4 && s.duration_seconds <= 20)}`);
  console.log(`First scene (opening): "${result.scenes[0]?.mood}"`);
  console.log(`Last scene (closing): "${result.scenes[result.scenes.length - 1]?.mood}"`);
  console.log('\nTest complete.');
}

main().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
