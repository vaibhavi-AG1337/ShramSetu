import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, Briefcase, Search, Users } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src="/images/hero-image.jpg" alt="Workers at work" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="mb-6">
            <Image
              src="/images/shram-setu-logo.png"
              alt="Shram Setu Logo"
              width={180}
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Connecting Workers with Employers</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Building bridges for better livelihoods and sustainable employment opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/jobs">Find Jobs</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Link href="/employer/login">Employer Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Mission Section */}
      <section className="py-16 bg-white torn-edge">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="decorative-corner">
                <h2 className="text-3xl font-bold text-secondary mb-6 pl-6">Our Mission</h2>
              </div>
              <p className="text-lg mb-6">
                In India, millions of skilled workers struggle to find consistent employment that values their skills
                and provides fair wages. Many are forced to migrate to urban centers for low-paying and unstable work,
                disconnected from employers who need their expertise.
              </p>
              <p className="text-lg mb-6">
                Shram Setu aims to bridge this gap by creating a direct connection between workers and employers,
                eliminating middlemen, and ensuring fair wages for honest work. We provide a platform where workers can
                showcase their skills and find stable employment opportunities.
              </p>
              <p className="text-lg">
                By connecting workers directly with those who need their services, we're creating a more equitable labor
                market and helping to preserve valuable skills while improving livelihoods.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square relative overflow-hidden rounded-md">
                  <Image
                    src={`/images/worker-${i}.jpg`}
                    alt={`Worker in action ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-secondary/10 shram-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="decorative-corner inline-block">
              <h2 className="text-3xl font-bold text-secondary mb-6 pl-6">How It Works</h2>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Shram Setu makes it easy for workers to find jobs and for employers to find skilled workers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-12 w-12 text-primary" />,
                title: "Find Opportunities",
                description:
                  "Workers can browse through various job listings across different sectors and locations to find opportunities that match their skills and preferences.",
              },
              {
                icon: <Briefcase className="h-12 w-12 text-primary" />,
                title: "Apply for Jobs",
                description:
                  "With a simple profile, workers can apply for jobs directly through the platform, showcasing their skills and experience to potential employers.",
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: "Connect Directly",
                description:
                  "Employers can browse worker profiles, post job opportunities, and connect directly with workers, eliminating middlemen and ensuring fair wages.",
              },
            ].map((step, i) => (
              <Card key={i} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p>{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="decorative-corner">
            <h2 className="text-3xl font-bold text-secondary mb-10 pl-6">What We Offer</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-primary mb-4">For Workers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Access to jobs across various sectors and locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Simple profile creation to showcase your skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>AI assistant for guidance and support in your language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Skill development resources and training opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Fair wages and direct payment system</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/workers/register">Register as a Worker</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-secondary mb-4">For Employers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Access to a large pool of verified skilled workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Post job opportunities and projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Browse worker profiles and contact them directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Dashboard to manage job postings and applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Secure and transparent hiring process</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="bg-secondary hover:bg-secondary/90">
                    <Link href="/employer/login">Employer Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="decorative-corner">
            <h2 className="text-3xl font-bold text-secondary mb-10 pl-6">Success Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                occupation: "Construction Worker",
                location: "Delhi",
                image: "/images/testimonial-1.jpg",
                quote:
                  "Shram Setu helped me find regular construction work near my home. I no longer have to travel to the city center every day hoping to find work.",
              },
              {
                name: "Lakshmi Devi",
                occupation: "Domestic Helper",
                location: "Mumbai",
                image: "/images/testimonial-2.jpg",
                quote:
                  "Through this platform, I found stable employment with a family who respects my work and pays me fairly. My life has become more secure.",
              },
              {
                name: "Farhan Ahmed",
                occupation: "Electrician",
                location: "Bangalore",
                image: "/images/testimonial-3.jpg",
                quote:
                  "As a skilled electrician, I can now showcase my experience and find jobs that value my expertise. My income has increased by 40%.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-none shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.occupation}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for work or hiring skilled workers, Shram Setu is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link href="/workers/register">Register as a Worker</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/employer/login">Employer Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
