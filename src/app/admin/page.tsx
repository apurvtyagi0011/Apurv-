import { getContent } from "@/lib/content";
import { portfolioCategories } from "@/data/portfolio";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import PortfolioManager from "@/components/admin/PortfolioManager";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-black">Manage Photos</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-sm text-charcoal/60">
        Changes appear on the live site within a few seconds.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <SingleImageUploader
          label="Home Hero Photo"
          keyName="heroImage"
          currentUrl={content.heroImage}
        />
        <SingleImageUploader
          label="About Page Photo"
          keyName="aboutImage"
          currentUrl={content.aboutImage}
        />
        <SingleImageUploader
          label="Artist Photo"
          keyName="artistImage"
          currentUrl={content.artistImage}
        />
      </div>

      <div className="mt-8">
        <PortfolioManager items={content.portfolioItems} categories={portfolioCategories} />
      </div>
    </div>
  );
}
