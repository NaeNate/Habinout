"use client"

import Pending from "@/components/Pending"
import { cap } from "@/utils/client"
import Link from "next/link"
import { useActionState } from "react"
import { readMembers } from "./actions"

export default function Form() {
  const [state, action] = useActionState(readMembers, {
    docs: [],
    fd: new FormData(),
  })

  return (
    <>
      <form action={action} className="flex flex-col">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          defaultValue={(state.fd.get("firstName") || "") as string}
          placeholder="First Name"
          className="input mb-2"
        />

        <label htmlFor="fatherName">Father&apos;s Name</label>
        <input
          id="fatherName"
          name="fatherName"
          defaultValue={(state.fd.get("fatherName") || "") as string}
          placeholder="Father's Name"
          className="input mb-2"
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={(state.fd.get("phoneNumber") || "") as string}
          placeholder="Phone Number"
          className="input mb-4"
        />

        <Pending />
      </form>

      <div className="mt-4 flex flex-col gap-4">
        {state.docs.map((doc: any) => {
          return (
            <Link
              href={"/member/" + doc.id}
              className="border-primary flex justify-around rounded border-2 p-2"
              key={doc.id}
            >
              <p>
                {cap(doc.firstName)} {cap(doc.fatherName)}{" "}
                {cap(doc.grandfatherName)}
              </p>

              <p>Phone Number: {doc.phoneNumber}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
