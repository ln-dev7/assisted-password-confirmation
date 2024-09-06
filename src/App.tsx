import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function App() {
  const password = "ui.lndev.me";
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      confirmPassword.length >= password.length &&
      e.target.value.length > confirmPassword.length
    ) {
      setShake(true);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const getLetterStatus = (letter: string, index: number) => {
    if (!confirmPassword[index]) return "";
    return confirmPassword[index] === letter
      ? "bg-green-500/20"
      : "bg-red-500/20";
  };

  const passwordsMatch = password === confirmPassword;

  const bounceAnimation = {
    x: shake ? [-10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.5 },
  };

  const matchAnimation = {
    scale: passwordsMatch ? [1, 1.05, 1] : 1,
    transition: { duration: 0.3 },
  };

  const borderAnimation = {
    borderColor: passwordsMatch ? "#10B981" : "",
    transition: { duration: 0.3 },
  };

  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center w-full z-10">
        <div className="w-full border-b border-dashed border-slate-200"></div>
        <div className="w-full flex flex-col gap-8 justify-center items-center h-full max-w-lg mx-auto p-16 bg-white">
          <div className="relative flex flex-col items-start justify-center w-full">
            <span className="text-sm font-semibold">→ {password}</span>
            <motion.div
              className="mb-3 mt-1 w-full border-2 py-2 px-2 rounded-xl bg-white  h-[52px]"
              animate={{
                ...bounceAnimation,
                ...matchAnimation,
                ...borderAnimation,
              }}
            >
              <div className="overflow-hidden rounded-lg relative w-fit h-full">
                <div className="py-1 px-0 h-full bg-transparent flex items-center justify-center tracking-[0.15em] z-10">
                  {password.split("").map((_, index) => (
                    <div
                      key={index}
                      className="w-4 shrink-0 h-full flex items-center justify-center"
                    >
                      <span className="size-[5px] bg-black rounded-full"></span>
                    </div>
                  ))}
                </div>
                <div className="absolute h-full left-0 w-full top-0 bottom-0 z-0 flex items-center justify-start">
                  {password.split("").map((letter, index) => (
                    <motion.div
                      key={index}
                      className={`w-4 absolute h-full transition-all duration-300 ease ${getLetterStatus(
                        letter,
                        index
                      )}`}
                      style={{
                        left: `${index * 16}px`,
                        scaleX: confirmPassword[index] ? 1 : 0,
                        transformOrigin: "left",
                      }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full overflow-hidden rounded-xl h-[52px]"
              animate={matchAnimation}
            >
              <motion.input
                className="w-full h-full border-2 rounded-xl py-3 px-3.5 bg-white outline-none focus:border-slate-900 tracking-[0.4em] placeholder:tracking-normal"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                animate={borderAnimation}
              />
            </motion.div>
          </div>
        </div>
        <div className="w-full border-t border-dashed border-slate-200"></div>
      </div>
      <div className="absolute w-full h-full inset-0">
        <div className="absolute w-full h-full inset-0 px-4 py-0 pointer-events-none">
          <div className="flex justify-between items-center h-full max-w-[1080px] mx-auto">
            <div className="bg-slate-200 w-[1px] h-full"></div>
            <div className="border-r border-slate-200 border-dashed h-full"></div>
            <div className="border-r border-slate-200 border-dashed h-full"></div>
            <div className="border-r border-slate-200 border-dashed h-full"></div>
            <div className="bg-slate-200 w-[1px] h-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
