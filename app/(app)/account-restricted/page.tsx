import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function AccountRestrictedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
            <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl font-semibold">Account Issue</CardTitle>
          <CardDescription>
            Your account access has been temporarily restricted due to a policy violation or security concern.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-2">What this means:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Your account is under review</li>
              <li>• Access to app features is temporarily limited</li>
              <li>• This may be due to reported content or safety concerns</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Need help?</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="mailto:support@roommate-app.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="tel:+1-555-0123">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Link>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/logout">Sign Out</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
