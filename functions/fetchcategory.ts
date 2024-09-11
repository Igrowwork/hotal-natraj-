import prismadb from "@/lib/prismadb";

export async function fetchCategories(){
    const allCategoreis = await prismadb.category.findMany()

    return allCategoreis
}
export async function fetchCategory(id: string){
    const Category = await prismadb.category.findFirst({
        where:{
            id
        }
    })

    return Category
}