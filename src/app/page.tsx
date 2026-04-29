import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/portfolioContent";

export default function Page() {
  redirect(`/${defaultLocale}`);
}
