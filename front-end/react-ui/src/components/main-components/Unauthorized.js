import { useNavigate } from "react-router-dom";
import React from "react";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      <Card>
        <section className="flex flex-col space-y-10">
          <div className="font-bold text-4xl text-white">
            You are not authorized to view this page
          </div>
          <div className="text-center">
            <button
              className="bg-white border border-primaryblue rounded-xl px-10 py-6 shadow text-xl"
              onClick={() => {
                navigate(-1);
              }}
            >
              Take me back
            </button>
          </div>
        </section>
      </Card>
    </BackgroundWrapper>
  );
};

export default Unauthorized;
