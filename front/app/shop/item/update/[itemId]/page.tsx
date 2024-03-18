import { FC } from "react";

import UpdateItemForm from "@/app/shop/item/update/[itemId]/components/UpdateItemForm";
import getIdItem from "@/app/action/getIdItem";
import getCurrentShop from "@/app/action/getCurrentShop";
import getCurrentUser from "@/app/action/getCurrentUser";

type Props = {
  params: {
    id: string[]
  }
}

const Page: FC<Props> = async ({ params }) => {
  const [itemId, purpose] = params.id
  const item = await getIdItem(itemId)
  let user
  if (purpose === "SHOP") {
    user = await getCurrentShop()
  }
  if (purpose === "USER") {
    user = await getCurrentUser()
  }
  if (!item) {
    return <p>商品が見つかりません</p>
  }
  return (
    <UpdateItemForm item={item} isCurrentUser={user?.id === item.shop.id} />
  )
}

export default Page