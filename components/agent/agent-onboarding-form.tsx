"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Building, User, Phone, Mail, Award, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AgentForm {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    profilePhoto: string
  }
  professionalInfo: {
    licenseNumber: string
    agency: string
    yearsExperience: string
    specialties: string[]
    serviceAreas: string[]
    languages: string[]
  }
  businessInfo: {
    bio: string
    website: string
    socialMedia: {
      linkedin: string
      instagram: string
      facebook: string
    }
  }
  verification: {
    licenseDocument: string
    idDocument: string
    businessCard: string
  }
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
}

const initialForm: AgentForm = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePhoto: "",
  },
  professionalInfo: {
    licenseNumber: "",
    agency: "",
    yearsExperience: "",
    specialties: [],
    serviceAreas: [],
    languages: [],
  },
  businessInfo: {
    bio: "",
    website: "",
    socialMedia: {
      linkedin: "",
      instagram: "",
      facebook: "",
    },
  },
  verification: {
    licenseDocument: "",
    idDocument: "",
    businessCard: "",
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
  },
}

const specialtyOptions = [
  "Residential Sales",
  "Residential Rentals",
  "Luxury Properties",
  "First-Time Buyers",
  "Investment Properties",
  "Commercial Real Estate",
  "Property Management",
  "Relocation Services",
]

const serviceAreaOptions = [
  "Mission District",
  "SOMA",
  "Castro",
  "Noe Valley",
  "Pacific Heights",
  "Marina District",
  "Richmond",
  "Sunset",
  "Haight-Ashbury",
  "Financial District",
]

const languageOptions = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
]

export function AgentOnboardingForm() {
  const [form, setForm] = useState<AgentForm>(initialForm)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const updateForm = (section: keyof AgentForm, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedForm = (section: keyof AgentForm, subsection: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value,
        },
      },
    }))
  }

  const toggleArrayItem = (section: keyof AgentForm, field: string, item: string) => {
    const currentArray = (form[section] as any)[field] as string[]
    const newArray = currentArray.includes(item) ? currentArray.filter((i) => i !== item) : [...currentArray, item]

    updateForm(section, field, newArray)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting agent application:", form)
    // Handle form submission
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join as a Real Estate Agent
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your profile to start connecting with clients</p>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && (
                <>
                  <User className="mr-2" /> Personal Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <Award className="mr-2" /> Professional Details
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Building className="mr-2" /> Business Information
                </>
              )}
              {currentStep === 4 && (
                <>
                  <CheckCircle className="mr-2" /> Verification Documents
                </>
              )}
              {currentStep === 5 && (
                <>
                  <CheckCircle className="mr-2" /> Preferences & Review
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={form.personalInfo.firstName}
                      onChange={(e) => updateForm("personalInfo", "firstName", e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={form.personalInfo.lastName}
                      onChange={(e) => updateForm("personalInfo", "lastName", e.target.value)}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={form.personalInfo.email}
                      onChange={(e) => updateForm("personalInfo", "email", e.target.value)}
                      placeholder="john.smith@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={form.personalInfo.phone}
                      onChange={(e) => updateForm("personalInfo", "phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Profile Photo</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload your profile photo</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={form.professionalInfo.licenseNumber}
                      onChange={(e) => updateForm("professionalInfo", "licenseNumber", e.target.value)}
                      placeholder="DRE #01234567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                    <Input
                      id="yearsExperience"
                      value={form.professionalInfo.yearsExperience}
                      onChange={(e) => updateForm("professionalInfo", "yearsExperience", e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="agency">Agency/Brokerage</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="agency"
                      value={form.professionalInfo.agency}
                      onChange={(e) => updateForm("professionalInfo", "agency", e.target.value)}
                      placeholder="Coldwell Banker"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Specialties</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {specialtyOptions.map((specialty) => (
                      <div
                        key={specialty}
                        onClick={() => toggleArrayItem("professionalInfo", "specialties", specialty)}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors text-sm ${
                          form.professionalInfo.specialties.includes(specialty)
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Service Areas</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {serviceAreaOptions.map((area) => (
                      <div
                        key={area}
                        onClick={() => toggleArrayItem("professionalInfo", "serviceAreas", area)}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors text-sm ${
                          form.professionalInfo.serviceAreas.includes(area)
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Languages</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {languageOptions.map((language) => (
                      <div
                        key={language}
                        onClick={() => toggleArrayItem("professionalInfo", "languages", language)}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors text-sm text-center ${
                          form.professionalInfo.languages.includes(language)
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={form.businessInfo.bio}
                    onChange={(e) => updateForm("businessInfo", "bio", e.target.value)}
                    placeholder="Tell potential clients about your experience, approach, and what makes you unique..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={form.businessInfo.website}
                    onChange={(e) => updateForm("businessInfo", "website", e.target.value)}
                    placeholder="https://www.yourwebsite.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Social Media (Optional)</Label>
                  <div>
                    <Input
                      value={form.businessInfo.socialMedia.linkedin}
                      onChange={(e) => updateNestedForm("businessInfo", "socialMedia", "linkedin", e.target.value)}
                      placeholder="LinkedIn Profile URL"
                    />
                  </div>
                  <div>
                    <Input
                      value={form.businessInfo.socialMedia.instagram}
                      onChange={(e) => updateNestedForm("businessInfo", "socialMedia", "instagram", e.target.value)}
                      placeholder="Instagram Profile URL"
                    />
                  </div>
                  <div>
                    <Input
                      value={form.businessInfo.socialMedia.facebook}
                      onChange={(e) => updateNestedForm("businessInfo", "socialMedia", "facebook", e.target.value)}
                      placeholder="Facebook Profile URL"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Verification Documents</h3>
                  <p className="text-sm text-gray-600">Upload the following documents to verify your credentials</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Real Estate License</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your real estate license</p>
                    </div>
                  </div>

                  <div>
                    <Label>Government ID</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your driver's license or passport</p>
                    </div>
                  </div>

                  <div>
                    <Label>Business Card (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your business card</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Verification Process</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Documents are reviewed within 24-48 hours</li>
                    <li>• All information is kept secure and confidential</li>
                    <li>• You'll receive email updates on verification status</li>
                    <li>• Verified agents get premium badge and features</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive updates about new leads and messages</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={form.preferences.emailNotifications}
                        onCheckedChange={(checked) => updateForm("preferences", "emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Get text alerts for urgent inquiries</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={form.preferences.smsNotifications}
                        onCheckedChange={(checked) => updateForm("preferences", "smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Receive tips, market updates, and platform news</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={form.preferences.marketingEmails}
                        onCheckedChange={(checked) => updateForm("preferences", "marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Application Summary</h4>
                  <div className="text-sm text-green-700 dark:text-green-400 space-y-1">
                    <p>• Personal information completed</p>
                    <p>• Professional credentials provided</p>
                    <p>• Business information added</p>
                    <p>• Verification documents uploaded</p>
                    <p>• Preferences configured</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    By submitting this application, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
