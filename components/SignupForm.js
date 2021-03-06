import {ErrorMessage, Field, Form, Formik, validateYupSchema} from "formik";
import Label from "./Label";
import * as Yup from "yup";
import {useState} from "react";

export default function SignupForm() {
    const [alreadySubmitted, setSubmitted] = useState(false);

    const signupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(3, 'Too short!')
            .max(20, 'Too long!'),
        lastName: Yup.string()
            .min(3, 'Too short!')
            .max(20, 'Too long!'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required!')
    });

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    if (alreadySubmitted) {
        return (
          <h2 className="my-8">Thank you!</h2>
        );
    } else {
        return (
            <Formik
                initialValues={{firstName: '', lastName: '', email: ''}}
                validationSchema={signupSchema}
                onSubmit={
                    (values, actions) => {
                        fetch("/", {
                            method: "POST",
                            headers: {"Content-Type": "application/x-www-form-urlencoded"},
                            body: encode({"form-name": "newsletter-subscribe", ...values})
                        })
                            .then(() => {
                                actions.resetForm();
                                setSubmitted(true);
                            })
                            .catch(() => {
                                alert('Error');
                            })
                            .finally(() => actions.setSubmitting(false))
                    }
                }
            >
                {(formik) => (
                    <Form
                        name="newsletter-subscribe"
                        data-netlify={true}
                        data-netlify-honeypot="bot-field"
                        className="mt-8 w-1/2 bg-grey-50 p-4 flex flex-col shadow-sm"
                    >
                        <Field type="hidden" name="form-name"/>
                        <Field type="hidden" name="bot-field"/>

                        <h2 className="text-center text-2xl font-bold">Sign up for my tips newsletter</h2>
                        <div className="my-2 flex flex-col">
                            <Label htmlFor="firstName" required={false} text="First name"/>
                            <Field id="firstName" name="firstName"
                                   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"></Field>
                            <ErrorMessage name="firstName" className="text-red-700 text-sm my-2" component="span"/>
                        </div>
                        <div className="my-2 flex flex-col">
                            <Label htmlFor="lastName" required={false} text="Last name"/>
                            <Field id="lastName" name="lastName"
                                   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"></Field>
                            <ErrorMessage name="lastName" className="text-red-700 text-sm my-2" component="span"/>
                        </div>
                        <div className="my-2 flex flex-col">
                            <Label htmlFor="email" required={true} text="email"/>
                            <Field id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"></Field>
                            <ErrorMessage name="email" className="text-red-700 text-sm my-2" component="span"/>
                        </div>
                        <button
                            disabled={!formik.isValid || !formik.dirty}
                            type="submit"
                            className="my-2 px-4 py-2 bg-blue-900 text-white disabled:opacity-50 transition-all duration-300">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        );
    }
}
