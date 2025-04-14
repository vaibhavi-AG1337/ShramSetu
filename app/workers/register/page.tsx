"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const SKILLS = [
  "Construction",
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Painting",
  "Agriculture",
  "Driving",
  "Cooking",
  "Cleaning",
  "Gardening",
  "Tailoring",
  "Masonry",
]

const EXPERIENCES = ["No Experience", "Less than 1 year", "1-3 years", "3-5 years", "5+ years"]

export default function WorkerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    aadharNumber: "",
    primarySkill: "",
    secondarySkills: [] as string[],
    experience: "",
    education: "",
    languages: [] as string[],
    wageExpectation: "",
    wageType: "daily",
    availableToWork: [] as string[],
    bio: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof prev] as string[]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting worker profile:", formData)
    // Logic to submit the worker registration
  }

  return (
    <div className="py-8 px-4 bg-secondary/5 shram-pattern">
      <div className="container mx-auto max-w-3xl">
        <Card className="border-none shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Image src="/images/shram-setu-logo.png" alt="Shram Setu Logo" width={120} height={80} />
            </div>
            <CardTitle className="text-2xl font-bold text-secondary">श्रमिक पंजीकरण / Worker Registration</CardTitle>
            <CardDescription>Create your profile to find suitable job opportunities</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Your current address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    name="aadharNumber"
                    placeholder="Your 12-digit Aadhar number"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Skills & Experience</h3>

                <div className="space-y-2">
                  <Label htmlFor="primarySkill">Primary Skill</Label>
                  <Select
                    value={formData.primarySkill}
                    onValueChange={(value) => handleSelectChange("primarySkill", value)}
                  >
                    <SelectTrigger id="primarySkill">
                      <SelectValue placeholder="Select your main skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {SKILLS.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Secondary Skills (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {SKILLS.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={formData.secondarySkills.includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleCheckboxChange("secondarySkills", skill)
                            } else {
                              handleCheckboxChange("secondarySkills", skill)
                            }
                          }}
                        />
                        <Label htmlFor={`skill-${skill}`} className="text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCES.map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Languages Spoken</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Punjabi"].map(
                      (language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${language}`}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange("languages", language)
                              } else {
                                handleCheckboxChange("languages", language)
                              }
                            }}
                          />
                          <Label htmlFor={`lang-${language}`} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wageExpectation">Expected Wage</Label>
                    <Input
                      id="wageExpectation"
                      name="wageExpectation"
                      placeholder="e.g. 700"
                      value={formData.wageExpectation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Wage Type</Label>
                    <RadioGroup
                      value={formData.wageType}
                      onValueChange={(value) => handleSelectChange("wageType", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="wage-daily" />
                        <Label htmlFor="wage-daily">Per Day</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="wage-monthly" />
                        <Label htmlFor="wage-monthly">Per Month</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Available to Work</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={formData.availableToWork.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleCheckboxChange("availableToWork", day)
                            } else {
                              handleCheckboxChange("availableToWork", day)
                            }
                          }}
                        />
                        <Label htmlFor={`day-${day}`} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Yourself</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell employers briefly about your experience and why they should hire you"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Create Profile
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
