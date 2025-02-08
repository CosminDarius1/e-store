'use server'

import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { error } from 'console';
import { redirect } from 'next/navigation';
import { imageSchema, productSchema, validateWithZodSchema } from './schemas';
import { deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import { id_ID, tr } from '@faker-js/faker';

const getAuthUser = async() => {
    const user  = await currentUser()
    if(!user) redirect('/')
        return user;
};

const getAdminUser = async() => {
    const user = await getAuthUser();
    if(user.id !== process.env.ADMIN_USER_ID) redirect('/');
    return user
}

const renderError = (error:unknown): {message:string} => {
    return {
        message:error instanceof Error ? error.message : 'an error occurred',} 
}

export const fetchFeaturedProducts = async() => {
    const products = await db.product.findMany({
        where:{featured: true,     
        },
      
    });
    return products;
};

export  const  fetchAllProducts = async({search = ''}:{search:string}) => {
    return db.product.findMany({
        where: {
            OR:[
                {name:{contains:search, mode:'insensitive'}},
                {company:{contains:search, mode:'insensitive'}},
            ]
        },
        orderBy:{
            createdAt:'desc'
        },
    })
}

export const fetchSingleProduct = async(productId:string) => {
    const product = await db.product.findUnique({
        where:{
            id:productId
        }
    })
    if(!product) redirect('/products')
        return product;
}


export const createProductAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
  
    try {
        const file = formData.get('image') as File
      const name = formData.get('name') as string;
      const company = formData.get('company') as string;
      const price = Number(formData.get('price') as string);
      const image = formData.get('image') as File;
      const description = formData.get('description') as string;
      const featured = Boolean(formData.get('featured') as string);
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      const fullPath = await uploadImage(validatedFile.image)
  
      await db.product.create({
        data: {
          name,
          company,
          price,
          image: fullPath,
          description,
          featured,
          clerkId: user.id,
        },
      });
    } catch (error) {
      return renderError(error);
    }
    redirect('/admin/products')
  };

  export const fetchAdminProducts = async() => {
    await getAdminUser()
    const products = await db.product.findMany({
        orderBy: {
            createdAt:'desc'
        }
    })
    return products
  }

  export const deleteProductAction = async(prevState:{productId:string}) => {
    const {productId} = prevState
    await getAdminUser()
    try{
        const product = await db.product.delete({
            where: {
                id:productId
            }
        })
        await deleteImage(product.image)
        revalidatePath('/admin/products')
        return {message: 'product removed'}
    } catch(error) {
        return renderError(error)
    }
}

export const fetchAdminProductDetails = async(productId:string) => {
    await getAdminUser()
    const product = await db.product.findUnique({
        where:{
            id:productId,
        },
    });
    if(!product) redirect('/admin/products');
    return product;
}


export const updateProductAction = async(prevState:any, formData:FormData) => {

await getAdminUser()
try {
    const productId = formData.get('id') as string
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(productSchema, rawData)

await db.product.update({
    where:{
        id:productId
    },
    data:{
        ...validatedFields
    },
});
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message:'Product updated successfully'}
} catch (error) {
    return renderError(error)
}
}
export const updateProductImageAction = async(prevState:any, formData:FormData) => {

    await getAuthUser()
    try {
        const image = formData.get('image') as File
        const productId = formData.get('id') as string;
        const oldImageUrl = formData.get('url') as string

        const validatedFile = validateWithZodSchema(imageSchema,{image});
        const fullPath = await uploadImage(validatedFile.image)
        await deleteImage(oldImageUrl)
        await db.product.update({
            where:{
                id:productId
            },
            data:{
                image: fullPath,
            },
        });
        revalidatePath(`/admin/products/${productId}/edit`)
        return { message:'Product updated successfully'}
    } catch (error) {
        return renderError(error);
    }
}

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
      where: {
        productId,
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });
    return favorite?.id || null;
  };

export const toggleFavoriteAction = async (prevState: {
    productId:string;
    favoriteId:string | null,
    pathname:string;
}) => {
    const user = await getAuthUser()
    const {productId, favoriteId,pathname} = prevState

    try {

        if(favoriteId) {
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        }
        else {
            await db.favorite.create({
                data: {
                    productId,
                    clerkId: user.id,
                },
            })
        }
        revalidatePath(pathname);
        return {message: favoriteId? 'removed from favorites' : 'added to favorites'}
        
    } catch (error) {
        
        return renderError(error)
    }
}

export const fetchUserFavorites = async() => {
    const user = await getAuthUser()
    const favorites = await db.favorite.findMany({
        where:{
            clerkId:user.id
        },
        include:{
            product: true,
        },
    })
    return favorites;
}