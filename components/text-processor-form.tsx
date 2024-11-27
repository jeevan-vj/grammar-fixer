"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  text: string;
  tone: string;
  customTone?: string;
}

export function TextProcessorForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState("");
  const { toast } = useToast();
  const { register, handleSubmit, watch, control } = useForm<FormData>({
    defaultValues: {
      tone: "professional"
    }
  });

  const selectedTone = watch("tone");

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to process text");
      }

      const result = await response.json();
      setProcessedText(result.processedText);
      toast({
        title: "Success!",
        description: "Your text has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter your text here..."
          className="min-h-[200px]"
          {...register("text", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Controller
          name="tone"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {selectedTone === "custom" && (
          <Textarea
            placeholder="Describe your desired tone..."
            className="mt-2"
            {...register("customTone")}
          />
        )}
      </div>

      <Button type="submit" disabled={isProcessing}>
        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Process Text
      </Button>

      {processedText && (
        <Card className="p-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">Processed Text:</h3>
          <p className="whitespace-pre-wrap">{processedText}</p>
        </Card>
      )}
    </form>
  );
}