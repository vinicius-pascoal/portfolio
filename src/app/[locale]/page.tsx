import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getPortfolioContent, locales } from "@/lib/portfolioContent";
import PortfolioPage from "./PortfolioPage";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocale(resolvedParams.locale);

  if (!locale) {
    return {};
  }

  const content = getPortfolioContent(locale);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function LocalePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = getLocale(resolvedParams.locale);

  if (!locale) {
    notFound();
  }

  const content = getPortfolioContent(locale);

  return <PortfolioPage content={content} />;
}
