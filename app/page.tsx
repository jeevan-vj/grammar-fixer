import { ThemeToggle } from "@/components/theme-toggle";
import { TextProcessorForm } from "@/components/text-processor-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Text Processor</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Enhance Your Text</h2>
            <p className="text-muted-foreground">
              Transform your writing with AI-powered tone adjustment and grammar correction.
              Simply enter your text, choose your desired tone, and let our system enhance it for you.
            </p>
          </div>

          <TextProcessorForm />
        </div>
      </main>
    </div>
  );
}