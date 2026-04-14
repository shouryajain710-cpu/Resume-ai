import { connectDB } from "@/lib/mongodb";
import CoverLetter from "@/models/CoverLetter";

export async function GET() {
  await connectDB();

  const data = await CoverLetter.find().sort({ createdAt: -1 });

  return Response.json(data);
}