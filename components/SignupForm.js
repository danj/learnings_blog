import {ErrorMessage, Field, Form, Formik, validateYupSchema} from "formik";
import Label from "./Label";
import * as Yup from "yup";

export default function SignupForm() {
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

    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: ''}}
            validationSchema={signupSchema}
            onSubmit={
                (values, actions) => {
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "newsletter-subscribe", ...values })
                    })
                        .then(() => {
                            alert('Success');
                            actions.resetForm()
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
                    className="w-fit bg-grey-50 p-4 flex flex-col shadow-sm"
                >
                    <Field type="hidden" name="form-name" />
                    <Field type="hidden" name="bot-field" />

                    <h2 className="text-center text-2xl font-bold">Sign up for my tips newsletter</h2>
                    <div className="my-2 flex flex-col">
                        <Label htmlFor="firstName" required={false} text="First name"/>
                        <Field id="firstName" name="firstName" className="p-2 border-2 border-gray-400"></Field>
                        <ErrorMessage name="firstName" className="text-red-700" component="span"/>
                    </div>
                    <div className="my-2 flex flex-col">
                        <Label htmlFor="lastName" required={false} text="Last name"/>
                        <Field id="lastName" name="lastName" className="p-2 border-2 border-gray-400"></Field>
                        <ErrorMessage name="lastName" className="text-red-700" component="span"/>
                    </div>
                    <div className="my-2 flex flex-col">
                        <Label htmlFor="email" required={true} text="email"/>
                        <Field id="email" name="email" className="p-2 border-2 border-gray-400"></Field>
                        <ErrorMessage name="email" className="text-red-700" component="span"/>
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
