"use client";

import { OrganizationList, useOrganizationList, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOrganizationPage() {
  const { createOrganization, setActive } = useOrganizationList();
  const [isSetting, setIsSetting] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.id && createOrganization && router) {
      if (user.organizationMemberships.length === 0) {
        console.log('no org');
        setIsSetting(true);
        createOrganization({ name: (user.firstName ? `${user.firstName}'s ` : "my ") + "workspace" })
          .then(res => {
            setActive({ organization: res.id }).then(() => {
              router.push(`/organization/${res.id}`);
            });
          })
          .catch(err => console.log("errrrr" + err));
      }
    }
  }, [user, createOrganization, router, setActive]);


  if (isSetting || (user && user.organizationMemberships.length === 0)) {
    return "loading";
  }

  if (user && user.organizationMemberships.length > 0) {
    return (
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl={"/organization/:id"}
        afterCreateOrganizationUrl={"/organization/:id"}
      />
    );
  }
}
