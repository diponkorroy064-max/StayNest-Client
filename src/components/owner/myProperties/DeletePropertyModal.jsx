"use client";
import { deleteProperty } from "@/lib/api/properties";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";


export function DeletePropertyModal({ item, setProperties }) {
    // console.log('property item from Modal', item);

    const handleDelete = async() => {
        try {
            await deleteProperty(item?._id);
            toast.success("Property deleted successfully");
            setProperties((prev) =>
                prev.filter((property) => property._id !== item._id)
            );
        }
        catch (err) {
            toast.error(err.message);
        }
    };


    return (
        <AlertDialog>
            <Button className="btn btn-square btn-sm btn-ghost hover:bg-error/10 rounded-lg text-error">
                <Trash2 className="w-4 h-4" />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete property permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{item?.title}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(item._id)} slot="close" variant="danger">
                                Delete Property
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}

