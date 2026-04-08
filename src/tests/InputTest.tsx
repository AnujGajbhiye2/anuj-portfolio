import { Search, Eye } from "lucide-react";
import Input from "../components/ui/Input";

<div className="space-y-4 max-w-md">
      <form action="/POST">
        {/* Basic */}
        <Input placeholder="Basic input" />

        {/* With error */}
        <Input placeholder="With error" error="This field is required" />

        {/* With left icon */}
        <Input
          placeholder="Search..."
          leftElement={<Search className="h-4 w-4" />}
        />

        {/* With right icon */}
        <Input
          type="password"
          placeholder="Password"
          rightElement={<Eye className="h-4 w-4 cursor-pointer" />}
        />

        {/* Disabled */}
        <Input placeholder="Disabled" disabled />
      </form>

      {/* With React Hook Form (test this later) */}
      {/* <Input {...register('email')} error={errors.email?.message} /> */}
    </div>