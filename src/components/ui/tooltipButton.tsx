import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {ReactNode} from "react";
const TooltipButton = ({ message, children }: { message: string; children: ReactNode }) => {
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>
                    {message}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipButton;