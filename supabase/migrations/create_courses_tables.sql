-- ============================================================
-- Sete Véus Course Platform — Database Schema
-- ============================================================

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug varchar(100) NOT NULL UNIQUE,
    title text NOT NULL,
    subtitle text,
    description text,
    language varchar(5) NOT NULL DEFAULT 'pt' CHECK (language IN ('pt', 'en')),
    price_cents integer NOT NULL DEFAULT 0,
    currency varchar(3) NOT NULL DEFAULT 'USD',
    stripe_price_id text,
    cover_url text,
    is_published boolean DEFAULT false,
    module_count integer NOT NULL DEFAULT 8,
    total_sub_lessons integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Modules table
CREATE TABLE IF NOT EXISTS public.modules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    sort_order integer NOT NULL DEFAULT 0,
    is_free boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id uuid NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title text NOT NULL,
    type text NOT NULL DEFAULT 'video_protected' CHECK (type IN ('video_protected', 'pdf_manual', 'pdf_exercises')),
    content_url text,
    duration_min integer,
    sort_order integer NOT NULL DEFAULT 0,
    is_preview boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    stripe_payment_id text,
    enrolled_at timestamptz DEFAULT now(),
    completed_at timestamptz,
    certificate_url text,
    certificate_code varchar(20) UNIQUE,
    UNIQUE(user_id, course_id)
);

-- Lesson progress table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completed_at timestamptz,
    last_position_sec integer DEFAULT 0,
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, lesson_id)
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_courses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_courses_updated_at();

CREATE TRIGGER lesson_progress_updated_at
    BEFORE UPDATE ON public.lesson_progress
    FOR EACH ROW EXECUTE FUNCTION update_courses_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Courses: public read, admin write
CREATE POLICY "courses_public_read" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "courses_admin_write" ON public.courses
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

-- Modules: public read
CREATE POLICY "modules_public_read" ON public.modules
    FOR SELECT USING (true);

CREATE POLICY "modules_admin_write" ON public.modules
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

-- Lessons: public read (content_url protected by signed URLs)
CREATE POLICY "lessons_public_read" ON public.lessons
    FOR SELECT USING (true);

CREATE POLICY "lessons_admin_write" ON public.lessons
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

-- Enrollments: users see own, admin sees all
CREATE POLICY "enrollments_user_read" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "enrollments_admin_read" ON public.enrollments
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "enrollments_service_insert" ON public.enrollments
    FOR INSERT WITH CHECK (true);

-- Lesson progress: users see/edit own
CREATE POLICY "lesson_progress_user_select" ON public.lesson_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "lesson_progress_user_insert" ON public.lesson_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "lesson_progress_user_update" ON public.lesson_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- Certificate verification function
-- ============================================================
CREATE OR REPLACE FUNCTION public.verify_certificate(p_code varchar)
RETURNS TABLE (
    course_title text,
    user_email text,
    completed_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.title, p.email, e.completed_at
    FROM public.enrollments e
    JOIN public.courses c ON c.id = e.course_id
    JOIN public.profiles p ON p.id = e.user_id
    WHERE e.certificate_code = p_code
    AND e.completed_at IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
