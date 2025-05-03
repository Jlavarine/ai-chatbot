"use client";

import React, { FC } from "react";

interface ChatControlsProps {
    modelOptions: string[];
    selectedModel: string;
    onChangeModel: (model: string) => void;
}

export const ChatControls: FC<ChatControlsProps> = ({
    modelOptions,
    selectedModel,
    onChangeModel,
}) => (
    <div className="mb-4 flex items-center gap-2">
        <label htmlFor="model" className="font-semibold mr-2">
            Model:
        </label>
        <div className="relative flex-1">
            <select
                id="model"
                value={selectedModel}
                onChange={(e) => onChangeModel(e.target.value)}
                className="w-full appearance-none bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {modelOptions.map((opt) => (
                    <option className="bg-gray-800 text-white">
                        {opt}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
);