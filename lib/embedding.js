import "dotenv/config";

export const connectionString = `postgresql://postgres.${process.env.SUPABASE_PROJECT_ID}:${process.env.SUPABASE_PASSWORD}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres`;