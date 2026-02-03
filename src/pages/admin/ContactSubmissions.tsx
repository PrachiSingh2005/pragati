import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Eye } from "lucide-react";
import { useContactSubmissions } from "@/contexts/ContactSubmissionsContext";
import { format } from "date-fns";

const ContactSubmissions = () => {
  const { submissions } = useContactSubmissions();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="editorial-heading text-2xl md:text-3xl mb-2">
              Contact Submissions
            </h1>
            <p className="body-text text-muted-foreground">
              View all contact form submissions from your website.
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-5 h-5" />
            <span className="text-sm">{submissions.length} submissions</span>
          </div>
        </div>

        {submissions.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="body-text text-muted-foreground">
                No contact submissions yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Subject</TableHead>
                    <TableHead className="text-foreground hidden md:table-cell">Message</TableHead>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id} className="border-border/50">
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-accent hover:underline"
                        >
                          {submission.email}
                        </a>
                      </TableCell>
                      <TableCell>{truncateText(submission.subject, 30)}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {truncateText(submission.message, 50)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                        {formatDate(submission.submitted_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="editorial-heading">
                                Contact Submission
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                                  <p className="font-medium">{submission.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                                  <a
                                    href={`mailto:${submission.email}`}
                                    className="text-accent hover:underline"
                                  >
                                    {submission.email}
                                  </a>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Subject</p>
                                <p className="font-medium">{submission.subject}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Message</p>
                                <p className="body-text bg-muted/30 p-3 rounded-sm">
                                  {submission.message}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                                <p className="text-sm">{formatDate(submission.submitted_at)}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 p-4 bg-card border border-border/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Contact submissions are only visible here in the admin panel.
            This data is not displayed publicly on the website.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactSubmissions;
