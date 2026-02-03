import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContactSubmissions } from "@/contexts/ContactSubmissionsContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addSubmission } = useContactSubmissions();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Save submission to database via API
      await addSubmission({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 lg:py-40 bg-card"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <div
            className={`${isVisible ? "animate-fade-up" : "opacity-0"
              }`}
          >
            <span className="body-text text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
              Get in Touch
            </span>
            <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Let's Create
              <br />
              Something Beautiful
            </h2>
            <p className="body-text text-muted-foreground text-lg leading-relaxed mb-8">
              Ready to transform your space? Share your vision with us, and
              we'll craft a design that exceeds your expectations.
            </p>
            <div className="space-y-4 body-text text-sm text-muted-foreground">
              <p>
                <span className="text-foreground">Email:</span>{" "}
                hello@pragatiinteriors.com
              </p>
              <p>
                <span className="text-foreground">Phone:</span>{" "}
                +91 98765 43210
              </p>
              <p>
                <span className="text-foreground">Studio:</span>{" "}
                Mumbai, India
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`${isVisible ? "animate-fade-up delay-200" : "opacity-0"
              }`}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="body-text text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-background border-border/50 focus:border-primary/50 
                              rounded-none h-12 body-text placeholder:text-muted-foreground/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="body-text text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-background border-border/50 focus:border-primary/50 
                              rounded-none h-12 body-text placeholder:text-muted-foreground/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="body-text text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project inquiry"
                          className="bg-background border-border/50 focus:border-primary/50 
                            rounded-none h-12 body-text placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="body-text text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
                          rows={6}
                          className="bg-background border-border/50 focus:border-primary/50 
                            rounded-none resize-none body-text placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto rounded-none"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
