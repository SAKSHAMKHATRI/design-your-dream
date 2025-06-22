
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const FeedbackForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for helping us improve.",
    });
    form.reset();
  };

  return (
    <section id="feedback" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">Give us Feedback</CardTitle>
              <CardDescription>Help us improve our service.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea id="feedback" name="feedback" placeholder="What do you think?..." required rows={5} />
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg">
                    Submit Feedback <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
