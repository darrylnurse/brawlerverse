import { createClient } from '@supabase/supabase-js';

const URL = "https://irtouwyhdzmxfainromu.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlydG91d3loZHpteGZhaW5yb211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDYyMjksImV4cCI6MjA0MDE4MjIyOX0.9eu_UjEtZvQo2PRMziCo8EubEGUwMK114w5DRPYInFY";

export const supabase = createClient(URL, API_KEY);