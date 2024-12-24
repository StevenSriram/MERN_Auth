import { Check, X } from "lucide-react";

const PassWordCriteria = ({ pass }) => {
  const criteria = [
    { label: "Minimum 6 characters", met: pass.length >= 6 },
    { label: "Includes lowercase letter", met: /[a-z]/.test(pass) },
    { label: "Includes uppercase letter", met: /[A-Z]/.test(pass) },
    { label: "Includes number", met: /[0-9]/.test(pass) },
    { label: "Includes special character", met: /[^A-Za-z0-9]/.test(pass) },
  ];

  // ! List all Criterias Matched or Not
  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          {item.met ? (
            <Check className="mr-2 text-green-500" />
          ) : (
            <X className="mr-2 text-gray-500" />
          )}
          <span
            className={`font-montserrat leading-normal ${
              item.met ? "text-green-500" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  // ! Strength of Password based on criteria
  const getStrength = (password) => {
    let curStrength = 0;

    if (password.length >= 6) curStrength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) curStrength++;
    if (password.match(/[0-9]/)) curStrength++;
    if (password.match(/[^A-Za-z0-9]/)) curStrength++;

    return curStrength;
  };

  const strength = getStrength(password);

  // ! Color of Password based on Strength
  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  // ! StrengthText of Password based on Strength
  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  // ! Meter to show Strength of Password
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full ${
              index < strength ? getColor(strength) : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <PassWordCriteria pass={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
