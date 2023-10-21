import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { socilaLinks } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name != "" && form.email != "" && form.message != "") {
      setLoading(true);

      emailjs
        .send(
          "service_cqebump",
          "template_nbi9dzf",
          {
            name: form.name,
            email: form.email,
            message: form.message,
          },
          "d57BClSs6lQ7x1cMh"
        )
        .then(
          () => {
            setLoading(false);
            alert("Thank you. I will get back to you as soon as possible");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            console.log(error);
            alert("Something went wrong");
          }
        );
    } else {
      alert("Fill all the details!!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="what's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="what's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="what do you wanna say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit font-bold text-white shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending" : "Send"}
          </button>
          <div className="flex flex-wrap gap-7">
            {socilaLinks.map((link) => (
              <div
                className="bg-tertiary w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => window.open(link.name, "_blank")}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            ))}
          </div>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[520px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
