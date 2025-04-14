"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, PlusCircle, CheckCircle2, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function EmployerDashboard() {
  const [activeJobsCount] = useState(5)
  const [applicationsCount] = useState(24)
  const [hiredCount] = useState(8)

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and worker applications</p>
          </div>
          <div className="flex gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/employer/jobs/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <h3 className="text-3xl font-bold">{activeJobsCount}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-secondary/10 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <h3 className="text-3xl font-bold">{applicationsCount}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Workers Hired</p>
                <h3 className="text-3xl font-bold">{hiredCount}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="hired">Hired Workers</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: 1,
                        title: "Construction Worker",
                        location: "Delhi",
                        postedDate: "2023-11-15",
                        status: "Active",
                        applications: 12,
                      },
                      {
                        id: 2,
                        title: "Electrician",
                        location: "Gurgaon",
                        postedDate: "2023-11-10",
                        status: "Active",
                        applications: 8,
                      },
                      {
                        id: 3,
                        title: "Plumber",
                        location: "Noida",
                        postedDate: "2023-11-05",
                        status: "Active",
                        applications: 3,
                      },
                      {
                        id: 4,
                        title: "Carpenter",
                        location: "Delhi",
                        postedDate: "2023-10-28",
                        status: "Active",
                        applications: 1,
                      },
                      {
                        id: 5,
                        title: "Painter",
                        location: "Faridabad",
                        postedDate: "2023-10-20",
                        status: "Active",
                        applications: 0,
                      },
                    ].map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.postedDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: 1,
                        name: "Ramesh Kumar",
                        avatar: "/images/avatar-1.jpg",
                        job: "Construction Worker",
                        appliedDate: "2023-11-18",
                        experience: "5 years",
                        status: "Pending",
                      },
                      {
                        id: 2,
                        name: "Suresh Singh",
                        avatar: "/images/avatar-2.jpg",
                        job: "Electrician",
                        appliedDate: "2023-11-17",
                        experience: "3 years",
                        status: "Reviewing",
                      },
                      {
                        id: 3,
                        name: "Priya Sharma",
                        avatar: "/images/avatar-3.jpg",
                        job: "Plumber",
                        appliedDate: "2023-11-15",
                        experience: "2 years",
                        status: "Interviewed",
                      },
                      {
                        id: 4,
                        name: "Vikram Patel",
                        avatar: "/images/avatar-4.jpg",
                        job: "Carpenter",
                        appliedDate: "2023-11-12",
                        experience: "7 years",
                        status: "Shortlisted",
                      },
                      {
                        id: 5,
                        name: "Neha Gupta",
                        avatar: "/images/avatar-5.jpg",
                        job: "Painter",
                        appliedDate: "2023-11-10",
                        experience: "4 years",
                        status: "Rejected",
                      },
                    ].map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
                              <AvatarFallback>{application.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{application.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{application.job}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>{application.experience}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              application.status === "Reviewing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : application.status === "Shortlisted"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : application.status === "Rejected"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : application.status === "Interviewed"
                                      ? "bg-purple-50 text-purple-700 border-purple-200"
                                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Contact
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hired">
            <Card>
              <CardHeader>
                <CardTitle>Hired Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Hire Date</TableHead>
                      <TableHead>Wage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: 1,
                        name: "Ajay Verma",
                        avatar: "/images/avatar-6.jpg",
                        position: "Construction Worker",
                        hireDate: "2023-10-05",
                        wage: "₹700/day",
                        status: "Active",
                      },
                      {
                        id: 2,
                        name: "Ravi Kumar",
                        avatar: "/images/avatar-7.jpg",
                        position: "Electrician",
                        hireDate: "2023-09-20",
                        wage: "₹900/day",
                        status: "Active",
                      },
                      {
                        id: 3,
                        name: "Anita Desai",
                        avatar: "/images/avatar-8.jpg",
                        position: "Domestic Helper",
                        hireDate: "2023-09-15",
                        wage: "₹15,000/month",
                        status: "Active",
                      },
                      {
                        id: 4,
                        name: "Mohan Singh",
                        avatar: "/images/avatar-9.jpg",
                        position: "Plumber",
                        hireDate: "2023-08-10",
                        wage: "₹800/day",
                        status: "Inactive",
                      },
                      {
                        id: 5,
                        name: "Lakshmi Rao",
                        avatar: "/images/avatar-10.jpg",
                        position: "Gardener",
                        hireDate: "2023-07-22",
                        wage: "₹650/day",
                        status: "Active",
                      },
                    ].map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                              <AvatarFallback>{worker.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{worker.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{worker.position}</TableCell>
                        <TableCell>{worker.hireDate}</TableCell>
                        <TableCell>{worker.wage}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              worker.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {worker.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Contact
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
