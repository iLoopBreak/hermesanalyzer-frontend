import { getPlaceholders } from "@/lib/placeholder";
import { Button } from "@design/ui/button";
import { Input } from "@design/ui/input";
import { Label } from "@design/ui/label";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useRef, useState } from "react";

interface PromptProps {
    prompt: string;
    addPrompt: (prompt: string) => void;
}

const generatePrompt = (prompt: string, placeholders: Record<string, string>) => {
    const keys = Object.keys(placeholders);

    let newPrompt = prompt;

    keys.forEach(key => {
        newPrompt = newPrompt.replace(`<${key}>`, placeholders[key])
    })

    return newPrompt
}


export const Prompt = ({ prompt, addPrompt }: PromptProps) => {
    const [toggle, setToggle] = useState(false);
    const promptRef = useRef()
    const placeholders = getPlaceholders(prompt);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const placeholders = Object.fromEntries(data.entries());

        const newPrompt = generatePrompt(prompt, placeholders as Record<string, string>);

        addPrompt(newPrompt)
    }

    const onToggle = () => {
        setToggle(!toggle)
    }

    return (
        <fieldset className="p-4 border rounded-md gap-2" >
            <legend className="-ml-1 px-1 text-sm font-medium flex items-center justify-between space-x-2 ">
                <p className="text-sm font-semibold">
                    Prompt
                </p>
            </legend>

            <div className="flex bg-slate-600 bg-opacity-60 px-2 py-1 rounded-md flex-row gap-2 items-center justify-between mx-1">
                <p>{prompt}</p>
                <Button variant={"default"} size={"icon"}
                    className="size-8 min-w-8 min-h-8"
                    onClick={onToggle}
                // className={`${toggle ? 'bg-red-500 hover:bg-red-700 ' : 'bg-green-500 hover:bg-green-700'} bg-opacity-70 rounded-md px-1`}
                >

                    {toggle ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                </Button>
            </div>

            <form
                onSubmit={onSubmit}
                className={`mt-4 grid gap-3 ${toggle ? 'block' : 'hidden'}`}
            >

                {
                    placeholders.map((placeholder, _) => {
                        const id = `${promptRef}-${placeholder}`
                        return (<div key={id} className="space-y-2">
                            <Label
                                className="text-sm font-semibold"
                                htmlFor={id}>{placeholder.toString()}</Label>
                            <Input id={id} name={placeholder.toString()} type="text" required />
                        </div>)
                    })
                }

                <Button variant={"default"} size={"default"} className="mx-auto" type="submit">Add</Button>

                {/* <input type="submit" className="bg-green-600 bg-opacity-60 text-lg p-1 rounded-md block mt-3" value={"Add"} /> */}
            </form>
        </fieldset>)
}