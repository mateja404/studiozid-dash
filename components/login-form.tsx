"use client";

import { FormEvent, useEffect, useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Bowser from "bowser";

interface LoginFormProps {
  deviceId: string
  className: React.ComponentProps<"div">
}

export function LoginForm({ deviceId, className,  ...props }: LoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [ip, setIp] = useState();
  const [os, setOs] = useState<any>();
  const [browserInfo, setBrowserInfo] = useState<any>();

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userAgent = navigator.userAgent;
        const browser = Bowser.getParser(userAgent);
        const operativni = browser.getOS();
        const browserDetail = browser.getBrowser();
        setOs(operativni);
        setBrowserInfo(browserDetail);
        setIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchIP()
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password: password });
      console.log(response.data);
      toast.success(response.data.message);
      sessionStorage.setItem("token", response.data.token);
      router.push("/");
      const res = await axios.post("/api/send-device-info", { ip: ip, os: os, browser: browserInfo, deviceId: deviceId });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster/>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Dobrodošli u Studio Zid</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Lozinka</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                className="focus-visible:ring-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Uloguj se
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary opacity-0 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
