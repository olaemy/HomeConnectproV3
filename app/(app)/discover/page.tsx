import { RoommatesTab } from "@/components/tabs/roommates-tab"
import { ApartmentsTab } from "@/components/tabs/apartments-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DiscoverPage() {
  return (
    <div className="p-4 md:p-6">
      <Tabs defaultValue="roommates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roommates">Roommates</TabsTrigger>
          <TabsTrigger value="apartments">Apartments</TabsTrigger>
        </TabsList>
        <TabsContent value="roommates" className="mt-4">
          <RoommatesTab />
        </TabsContent>
        <TabsContent value="apartments" className="mt-4">
          <ApartmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
