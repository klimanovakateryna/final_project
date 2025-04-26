import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ggliqskqruylfeudnasd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbGlxc2txcnV5bGZldWRuYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MDE0OTksImV4cCI6MjA2MTI3NzQ5OX0.uNIDBMMObk5EYQYxfHeDV5fsLLhMALJ_9PHtwn9pfdE'

export const supabase = createClient(supabaseUrl, supabaseKey)
