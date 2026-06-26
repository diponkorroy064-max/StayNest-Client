"use client";
import { useEffect, useState } from "react";
import { Modal, Button, Input, TextField, Label, Surface } from "@heroui/react";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";
import { updateProperty } from "@/lib/api/properties";
import { useRouter } from "next/navigation";


export default function UpdatePropertyModal({ property }) {
    const router = useRouter();

    // console.log('property from update modal', property);
    const { amenities, bathrooms, bedrooms, description, extraFeatures, location, ownerEmail, rentType, size, title, rentAmount,propertyType, images, _id} = property;

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const updateData = Object.fromEntries(formData.entries());
        console.log("updatedData", updateData);

        // const { data: tokenData } = await authClient.token();
        // console.log(tokenData);
        try {
            const data = await updateProperty(_id, updateData);
            console.log(data);

            if (data.modifiedCount > 0) {
                router.push('/dashboard/owner/myProperties');
                toast.success('Property updated successfully');
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <Modal>
            <Button className="btn btn-square btn-sm btn-ghost hover:bg-base-200 rounded-lg text-neutral-500">
                <Edit className="w-4 h-4" />
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="">
                        <Modal.Header>
                            <Modal.Icon className="flex justify-between items-center">
                                <div className="bg-primary/10 text-primary p-2 rounded-full">
                                    <Edit className="w-5 h-5" />
                                </div>
                                <Modal.CloseTrigger className="size-9 rounded-full" />
                            </Modal.Icon>

                            <Modal.Heading>
                                Update property details and save the changes
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default" className="p-4 rounded-xl">

                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <TextField name="title" variant="secondary" defaultValue={title}>
                                        <Label className="font-bold text-gray-700">Property Title</Label>
                                        <Input name="title" placeholder="Property title" />
                                    </TextField>

                                    <TextField name="location" variant="secondary" defaultValue={location}>
                                        <Label className="font-bold text-gray-700">Location</Label>
                                        <Input name="location" placeholder="Property location" />
                                    </TextField>

                                    <TextField name="rentAmount" variant="secondary" defaultValue={rentAmount}>
                                        <Label className="font-bold text-gray-700">Rent Amount</Label>
                                        <Input type="number" name="rentAmount"/>
                                    </TextField>

                                    <TextField name="propertyType" variant="secondary" defaultValue={propertyType}>
                                        <Label className="font-bold text-gray-700">Property Type</Label>
                                        <Input name="propertyType" placeholder="Apartment, House, Villa..." />
                                    </TextField>

                                    <TextField name="description" variant="secondary" defaultValue={description}>
                                        <Label className="font-bold text-gray-700">Description</Label>
                                        <Input name="description" />
                                    </TextField>

                                    <TextField name="ownerEmail" variant="secondary" defaultValue={ownerEmail}>
                                        <Label className="font-bold text-gray-700">Owner Email</Label>
                                        <Input name="ownerEmail"/>
                                    </TextField>

                                    <TextField name="bathrooms" variant="secondary" defaultValue={bathrooms}>
                                        <Label className="font-bold text-gray-700">Bathrooms</Label>
                                        <Input name="bathrooms" />
                                    </TextField>

                                    <TextField name="bedrooms" variant="secondary" defaultValue={bedrooms}>
                                        <Label className="font-bold text-gray-700">Bedrooms</Label>
                                        <Input name="bedrooms" />
                                    </TextField>

                                    <TextField name="rentType" variant="secondary" defaultValue={rentType}>
                                        <Label className="font-bold text-gray-700">Rent Type</Label>
                                        <select name="rentType" className="border border-gray-300 py-2 rounded-sm">
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                    </TextField>

                                    <TextField name="size" variant="secondary" defaultValue={size}>
                                        <Label className="font-bold text-gray-700">Property Size</Label>
                                        <Input name="size" />
                                    </TextField>
                                    
                                    <Modal.Footer>
                                        <Button variant="secondary" slot="close"> Cancel</Button>
                                        <Button color="primary" slot="close" type="submit"> Save Changes</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

