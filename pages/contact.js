import React from 'react';

const Contact = () => {
  return (
    <section className="sm:flex-row flex-col flex justify-center items-center gap-12 px-2">
      <div className="sm:text-left text-center ">
        <h1 className="sm:text-7xl text-5xl font-extrabold">Send me an email ✉</h1>
        <div className="form-control w-full">
          <label className="label mt-2">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" placeholder="Name here" className="input input-bordered w-full" />
          <label className="label mt-2">
            <span className="label-text">What is your email?</span>
          </label>
          <input type="text" placeholder="Email here" className="input input-bordered w-full" />
          <label className="label mt-2">
            <span className="label-text">Text me</span>
          </label>
          <textarea className="textarea textarea-bordered mb-8" placeholder="Message" defaultValue={''} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
