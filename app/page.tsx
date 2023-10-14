import Image from 'next/image'
import Container from "@/components/Container";
import SearchBanner from "@/components/banner/SearchBanner";
import ShopByDepartment from "@/components/lists/ShopByDepartment";
import BrowseProfessionals from "@/components/lists/BrowseProfessionals";
import SpecialOfferByApexHS from "@/components/lists/SpecialOfferByApexHS";

export default function Home() {
  return (
      <Container>
        <div>
            <SearchBanner/>
            <SpecialOfferByApexHS/>
            <BrowseProfessionals/>
            <ShopByDepartment/>

        </div>
      </Container>
    // <div className="text-rose-500 text-2xl"></div>
  )
}
