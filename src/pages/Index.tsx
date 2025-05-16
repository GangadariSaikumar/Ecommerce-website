
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import PromoSection from "@/components/PromoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <PromoSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
}
