// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, addDoc, setDoc, getDoc, doc } from 'firebase/firestore'; // Firestore functions
import { db as clientDb } from '@/lib/firebase'; // Client Firestore

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Create a query to find votes with the matching blog_id
        const votesQuery = query(
            collection(clientDb, 'votes'),
            where('blog_id', '==', id)
        );

        // Execute the query
        const querySnapshot = await getDocs(votesQuery);
        let voteCount = 0;

        // Map through documents and extract data
        const votes = querySnapshot.docs.map((doc) => {
            voteCount += doc.data().vote;
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        return NextResponse.json({ votes, voteCount }); // Return the votes as JSON response
    } catch (error) {
        console.error('Error fetching votes:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the votes.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();
    const { user_id, vote } = data;
    const voteData = { user_id, vote, blog_id: id };
    const blogRef = doc(clientDb, 'blogPosts', id);
    try {
        const docRef = await addDoc(collection(clientDb, 'votes'), voteData);
        const blogDoc = await getDoc(blogRef);
        const voteCount = blogDoc.voteCount + (vote === 1 ? 1 : -1);
        await setDoc(blogRef, {
            voteCount,
            ...blogDoc,
        })
        return NextResponse.json({ message: 'Vote added successfully!', docId: docRef.id, voteCount: voteCount });
    } catch (err) {
        console.error('Error adding vote:', err);
        return NextResponse.json({ error: 'An error occurred while adding the vote.' }, { status: 500 });
    }
}