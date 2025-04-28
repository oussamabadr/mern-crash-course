import { Avatar, Badge, Box, Button, CloseButton, DataList, Dialog, Heading, HStack, Image, Input, Portal, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster"
import { useState } from "react";

export const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [open, setOpen] = useState(false)

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id)
        if (success) {
            toaster.create({
                title: 'Success',
                description: message,
                type: 'success',
                duration: 3000,
                isClosable: true
            })
        } else {
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct)
        setOpen(false)
        if (success) {
            toaster.create({
                title: 'Success',
                description: "Product updated successfully",
                type: 'success',
                duration: 3000,
                isClosable: true
            })
        } else {
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    };
    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <Dialog.Root modal={true} closeOnInteractOutside={false} open={open} onOpenChange={(e) => setOpen(e.open)}>
                        <Dialog.Trigger asChild>
                            <Button colorPalette="blue"> <CiEdit /> </Button>

                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Update Product</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body pb="8">
                                        <VStack spacing={4}>
                                            <Input
                                                placeholder='Product Name'
                                                name='name'
                                                value={updatedProduct.name}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                            />
                                            <Input
                                                placeholder='Price'
                                                name='price'
                                                type='number'
                                                value={updatedProduct.price}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                            />
                                            <Input
                                                placeholder='Image URL'
                                                name='image'
                                                value={updatedProduct.image}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                            />
                                        </VStack>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Button 
                                        colorPalette="blue"
                                        mr={3}
                                        onClick={(() => handleUpdateProduct(product._id, updatedProduct))}
                                        >Update</Button>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="ghost">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>

                    <Button colorPalette="red" onClick={() => handleDeleteProduct(product._id)}> <MdDelete /> </Button>
                </HStack>
            </Box>



        </Box>
    )
}
