"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PhoneIcon, MailIcon } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    setMessage("Thank you for your feedback!");
    setFeedback("");
    setEmail("");
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-96">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        About Us
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Deal Hives is a leading online retail destination revolutionizing the
                way people shop. We offer an extensive selection of high-quality
                products at competitive prices, backed by exceptional customer
                service and innovative technology.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle>Customer Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                At Deal Hives, our customers are at the heart of everything we do. We
                are committed to providing an exceptional shopping experience
                that exceeds expectations and earns trust and loyalty.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle>Service Quality And Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are driven by a commitment to excellence and a passion for
                delivering superior quality products and services. We source
                from trusted suppliers known for their craftsmanship,
                durability, and reliability.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <PhoneIcon className="mr-2" />
              <Link href={"tel:8254888028"}>(825) 488-8-28</Link>
            </div>
            <div className="flex items-center">
              <MailIcon className="mr-2" />
              <Link href={"mailto:dhillonhunar@gmail.com"}>Dhillonhunar@gmail.com</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="mt-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <CardTitle>Feedback and Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => SubmitHandler} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Write your feedback here"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              {message && <p className="text-sm text-green-600">{message}</p>}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
