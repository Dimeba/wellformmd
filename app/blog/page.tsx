"use client";

// app/about/[slug]/page.tsx
import { useParams } from "next/navigation";

import Hero from "../../components/Hero";

export default function AboutSlugPage() {
  const params = useParams();
  const { slug } = params;

  const subtitle = "Ovo je podnaslov ";
  const title = "Testno";
  const heroLayout = "layout3";

  return (
    <div>
      <Hero subtitle={subtitle} title={title} heroLayout={heroLayout} />
    </div>
  );
}
