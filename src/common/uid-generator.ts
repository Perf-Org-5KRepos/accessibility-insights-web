// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { v4 } from 'uuid';

export type UUIDGenerator = () => string;

export let generateUID: UUIDGenerator = v4;
