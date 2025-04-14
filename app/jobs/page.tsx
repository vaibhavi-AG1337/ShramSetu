"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, BookmarkPlus, Home, Bell, User, MessageCircle } from "lucide-react"

const JOBS = [
  {
    id: 1,
    title: "Construction Worker",
    company: "BuildRight",
    companyLogo: "/images/company-1.jpg",
    location: "Delhi, DL",
    wage: "₹700",
    perDay: true,
    fullTime: true,
    year: "2023",
    teamSize: 4,
  },
  {
    id: 2,
    title: "Domestic Helper",
    company: "HomeServices",
    companyLogo: "/images/company-2.jpg",
    location: "Mumbai, MH",
    wage: "₹15,000",
    perDay: false,
    fullTime: true,
    year: "2023",
    teamSize: 1,
  },
  {
    id: 3,
    title: "Factory Worker",
    company: "Manufact",
    companyLogo: "/images/company-3.jpg",
    location: "Pune, MH",
    wage: "₹550",
    perDay: true,
    fullTime: true,
    year: "2023",
    teamSize: 7,
  },
  {
    id: 4,
    title: "Gardener",
    company: "GreenThumb",
    companyLogo: "/images/company-4.jpg",
    location: "Bangalore, KA",
    wage: "₹650",
    perDay: true,
    fullTime: false,
    year: "2023",
    teamSize: 3,
  },
  {
    id: 5,
    title: "Electrician",
    company: "PowerFix",
    companyLogo: "/images/company-5.jpg",
    location: "Chennai, TN",
    wage: "₹900",
    perDay: true,
    fullTime: true,
    year: "2023",
    teamSize: 2,
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter jobs based on search term
  const filteredJobs = JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen gradient-bg py-8 px-4 md:py-12">
      <div className="container mx-auto">
        {/* App-like header */}
        <div className="max-w-xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Find the world's most <br />
            Amazing <span className="text-primary">job</span>
          </h1>

          {/* Search bar */}
          <div className="relative mt-6 mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your job"
              className="pl-10 py-6 rounded-full bg-white/90 border-none shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Popular jobs section */}
        <div className="max-w-xl mx-auto popular-jobs-section p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Popular job</h2>
            <Link href="/jobs/all" className="text-primary text-sm">
              See more
            </Link>
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <Card className="job-card p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="company-logo bg-primary/10">
                          <Image
                            src={job.companyLogo || "/placeholder.svg?height=40&width=40"}
                            alt={job.company}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-muted-foreground text-sm">{job.company}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{job.location}</span>
                            <span className="mx-1">•</span>
                            <span>{job.year}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <BookmarkPlus className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, job.teamSize))].map((_, i) => (
                            <div
                              key={i}
                              className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs border border-white"
                            >
                              {i + 1}
                            </div>
                          ))}
                          {job.teamSize > 3 && (
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs border border-white">
                              +{job.teamSize - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-primary">{job.wage}</span>
                        <span className="text-xs text-muted-foreground ml-1">{job.perDay ? "/ day" : "/ month"}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          job.fullTime ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {job.fullTime ? "Full Time" : "Part Time"}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No jobs found matching your search.</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => setSearchTerm("")}>
                  Show all jobs
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile-like navigation bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 md:hidden">
          <div className="flex justify-around">
            <Link href="/jobs" className="flex flex-col items-center text-primary">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/saved-jobs" className="flex flex-col items-center text-muted-foreground">
              <BookmarkPlus className="h-5 w-5" />
              <span className="text-xs mt-1">Saved</span>
            </Link>
            <Link href="/notifications" className="flex flex-col items-center text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="text-xs mt-1">Alerts</span>
            </Link>
            <Link href="/messages" className="flex flex-col items-center text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Messages</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-muted-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
