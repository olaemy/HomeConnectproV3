import { RoommatesTab } from "@/components/tabs/roommates-tab"
import { ApartmentsTab } from "@/components/tabs/apartments-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DiscoverPage() {
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="roommates" className="w-full h-full flex flex-col">
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 p-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roommates">Roommates</TabsTrigger>
            <TabsTrigger value="apartments">Apartments</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-hidden">
          <TabsContent value="roommates" className="h-full m-0">
            <RoommatesTab />
          </TabsContent>
          <TabsContent value="apartments" className="h-full m-0">
            <ApartmentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
