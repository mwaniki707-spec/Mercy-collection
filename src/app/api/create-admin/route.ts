import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In production, this would call the Firebase function
    // For now, redirect to the function URL
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mercy-collections-store';
    const functionUrl = process.env.NODE_ENV === 'development'
      ? `http://127.0.0.1:5001/${projectId}/us-central1/createSampleAdmin`
      : `https://us-central1-${projectId}.cloudfunctions.net/createSampleAdmin`;

    return NextResponse.json({
      message: 'To create an admin user, visit the following URL:',
      url: functionUrl,
      instructions: 'Open this URL in your browser to create the admin account.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

