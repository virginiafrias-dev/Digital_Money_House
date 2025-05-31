"use client";
import Edit from "@/public/icons/edit";
import Card from "../Card/Card";
import { DividerLine } from "../DividerLine";
import { useEffect, useState } from "react";
import CheckVerde from "@/public/icons/check-verde";
import RedErrorCross from "@/public/icons/RedErrorCross";
import axios from "axios";

const FIELDS = {
  email: { label: "Email", matchingField: "email" },
  firstname: { label: "Nombre", matchingField: "firstname" },
  lastname: { label: "Apellido", matchingField: "lastname" },
  dni: { label: "DNI", matchingField: "dni" },
  phone: { label: "Teléfono", matchingField: "phone" },
  password: { label: "Contraseña", matchingField: "password" },
};

interface ProfileData {
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  phone: string;
  password: string;
}

interface EditingState {
  firstname: {
    isEditing: boolean;
    value: string;
  };
  lastname: {
    isEditing: boolean;
    value: string;
  };
  email: {
    isEditing: boolean;
    value: string;
  };

  dni: {
    isEditing: boolean;
    value: string;
  };
  phone: {
    isEditing: boolean;
    value: string;
  };
  password: {
    isEditing: boolean;
    value: string;
  };
}

const EDITING_STATE_INITIAL_VALUES = {
  firstname: {
    isEditing: false,
    value: "",
  },
  lastname: {
    isEditing: false,
    value: "",
  },
  email: {
    isEditing: false,
    value: "",
  },
  dni: {
    isEditing: false,
    value: "",
  },
  phone: {
    isEditing: false,
    value: "",
  },
  password: {
    isEditing: false,
    value: "",
  },
};

export const PersonalInfo = ({ userData }: { userData: ProfileData }) => {
  const [editingState, setEditingState] = useState<EditingState>(
    EDITING_STATE_INITIAL_VALUES
  );

  const toggleEdit = (key: string) => {
    setEditingState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key as keyof EditingState],
        isEditing: !prev[key as keyof EditingState].isEditing,
      },
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setEditingState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key as keyof EditingState],
        value: value,
      },
    }));
  };

  const handleCancel = (key: string) => {
    toggleEdit(key);
    setEditingState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key as keyof EditingState],
        value: userData[key as keyof ProfileData],
      },
    }));
  };

  const handleConfirm = async (key: string) => {
    toggleEdit(key);
    try {
      const response = await axios.patch("/api/profile", {
        [key]: editingState[key as keyof EditingState].value,
      });
      if (response.status === 200) {
        location.href = "/profile";
      }
    } catch (error) {
      console.error(error);
      alert("Ha habido un error al actualizar los datos");
    }
  };

  useEffect(() => {
    setEditingState({
      firstname: {
        isEditing: false,
        value: userData.firstname,
      },
      lastname: {
        isEditing: false,
        value: userData.lastname,
      },
      email: {
        isEditing: false,
        value: userData.email,
      },
      dni: {
        isEditing: false,
        value: userData.dni,
      },
      phone: {
        isEditing: false,
        value: userData.phone,
      },
      password: {
        isEditing: false,
        value: userData.password,
      },
    });
  }, [userData]);

  return (
    <Card className="bg-white flex flex-col gap-2 p-6! shadow-lg ">
      <p className="font-bold text-xl text-black">Tus datos</p>

      {Object.entries(FIELDS).map(([key, value]) => (
        <PersonalInfoItem
          key={key}
          keyProp={key}
          label={value.label}
          value={
            editingState[value.matchingField as keyof typeof editingState].value
          }
          toggleEdit={toggleEdit}
          isEditing={editingState[key as keyof EditingState]?.isEditing}
          handleInputChange={handleInputChange}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      ))}
    </Card>
  );
};

interface PersonalInfoItemProps {
  label: string;
  value: string;
  keyProp: string;
  toggleEdit: (keyProp: string) => void;
  isEditing: boolean;
  handleInputChange: (key: string, value: string) => void;
  handleCancel: (key: string) => void;
  handleConfirm: (key: string) => void;
}

const PersonalInfoItem = ({
  label,
  value,
  keyProp,
  toggleEdit,
  isEditing,
  handleInputChange,
  handleCancel,
  handleConfirm,
}: PersonalInfoItemProps) => (
  <>
    <DividerLine />

    <div className="flex justify-between items-center gap-2">
      <div className="-space-y-0.5 grow">
        <p>{label}</p>
        {isEditing ? (
          <input
            className="p-0! px-2! rounded-sm! ring-1! ring-brand-gray/25! w-full"
            type="text"
            value={value}
            onChange={(e) => handleInputChange(keyProp, e.target.value)}
          />
        ) : (
          <p className="text-black/50 text-ellipsis">{value}</p>
        )}
      </div>
      {keyProp !== "email" && (
        <>
          {isEditing ? (
            <div className="flex gap-2 self-end">
              <button onClick={() => handleConfirm(keyProp)}>
                <CheckVerde className="w-7 h-7 rotate-[-7deg]" fill="green" />
              </button>
              <button onClick={() => handleCancel(keyProp)}>
                <RedErrorCross className="w-7 h-7" />
              </button>
            </div>
          ) : (
            <button
              className="self-end"
              onClick={() => {
                toggleEdit(keyProp);
              }}
            >
              <Edit />
            </button>
          )}
        </>
      )}
    </div>
  </>
);
