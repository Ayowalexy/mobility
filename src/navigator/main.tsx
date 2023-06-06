import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Stacks } from "./stacks";
import { AppStacks } from "./app-stacks";

export const Main = () => (
    <NavigationContainer>
        <Stacks />
    </NavigationContainer>
)