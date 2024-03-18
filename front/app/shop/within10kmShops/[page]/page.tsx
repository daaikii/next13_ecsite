import { FC } from "react"

import getWithin10kmShops from "@/app/action/getWithin10kmShops"
import Within10kmShops from "@/app/shop/within10kmShops/components/ShopList"

import { shops } from "@/app/mock"

type Props = {
  params: {
    page: string
  }
}

const Page: FC<Props> = async ({ params }) => {
  let page = Number(params.page)
  page = page || 1

  // const shops = await getWithin10kmShops()
  // if (!shops) {
  //   return <p>ショップが見つかりません</p>
  // }

  const shopsProps = shops.slice((page - 1) * 21, page * 21)
  return <Within10kmShops shops={shopsProps} page={page} itemLength={shops.length} />
}

export default Page