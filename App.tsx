import React, { useState, useCallback, useEffect } from 'react';
import StudentListInput from './components/StudentListInput';
import StudentListDisplay from './components/StudentListDisplay';
import Button from './components/Button';
import { DownloadIcon } from './components/icons/DownloadIcon';
import { TrashIcon } from './components/icons/TrashIcon';
import { UsersIcon } from './components/icons/UsersIcon';
import { UserCheckIcon } from './components/icons/UserCheckIcon';
import { UserXIcon } from './components/icons/UserXIcon';
import { QuestionMarkCircleIcon } from './components/icons/QuestionMarkCircleIcon';
import { AlertTriangleIcon } from './components/icons/AlertTriangleIcon';

// --- Default Class List Data ---
const DEFAULT_CLASS_LIST = `Abdul  Ahad
Abdul  Rahman
Abhay Kumar Mahto
Alisha  Perween
Aliya  Sarfaraz
Amit  Chakraborty
Amit Kumar Mahato
Ananya  Palit
Anjali  Kumari
Ankit  Sahu
Aqsa  Nazalia
Aslam  Ansari
Ayesha  Fatma
Azka  Shaheem
Bikram  Mardana
Chandan  Kumar
Chandan  Pandey
Daud  Minz
Devanshi Korah
Devjeet  Mahato
Devjeet  Mahato
Farheen  Noor
Gautam  Kumar
Gourav Kumar Bala
Gouri  Kumari
Homa  Perveen
Jainab  Firdous
Jiten  Mahato
Khushbu  Mahato
Koushik Kumar Bhakat 
Kunal  Paul
Maliha  Shahid
Manas Kumar Paul
Manish  Mishra
Masirah  Tabrez
Md Adil Hussain
Md Faryad Ali
Md Junaid Zeeshan
MD Mahasin  Ansari
MD SAAJID AJMAL
Mirshad  Ahmad
Mohammad  Nomaan
Mohammad Kamran Alam
Naman  Dey
Natasha  Singh
Niranjan  Pradhan
Nisha  Dandapat
Nousiya  Khan
Pawan  Kumar 1
Pawan  Kumar 2
Payal  Dutta
Pragati  Chasa
Prapti  sharma
Prince Kumar Gupta
Prity  Kumari
Prity Kumari Pradhan
RAHUL  KUMAR
Rang Bahadur Mahto
Ranjan  Shaw
Rinku  Mahato
Rinky  Kumari
Roshan  Yadav
Rounak  Kumar
Rushali  Patar
Sachin  Kumar
Sadiya  Tabassum
Samir  Kumar Banjare
Sandip  Mahato
Shilu  Napit
Shraddha  Gupta
Siddhi  Shukla
Subhanshu  Kumar
Sujata  Shaw
Sumit  Kumar
Suraj Kumar Mahato
Taiba  Shamim
Tanushree  Mahato
Taskeen  Aiman
Taslim  Summer
Vishal  Kumar
Vivek Kumar Rawani 
Zeba  Asad
Zeeshan  Ahmed`;

// --- Icons for Mobile Nav ---
const InputIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
);

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);


// --- Levenshtein Distance Functions for Fuzzy Matching ---

const levenshteinDistance = (s1: string, s2: string): number => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
};

const levenshteinSimilarity = (s1: string, s2: string): number => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  const distance = levenshteinDistance(longer, shorter);
  return (longerLength - distance) / longerLength;
};

interface PossibleMatch {
  masterName: string;
  presentName: string;
  score: number;
}

const App: React.FC = () => {
  const [totalStudentsInput, setTotalStudentsInput] = useState<string>(DEFAULT_CLASS_LIST);
  const [presentStudentsInput, setPresentStudentsInput] = useState<string>('');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.85);
  const [showClassList, setShowClassList] = useState<boolean>(false);
  
  const [totalStudents, setTotalStudents] = useState<string[]>([]);
  const [matchedStudents, setMatchedStudents] = useState<string[]>([]);
  const [possibleMatches, setPossibleMatches] = useState<PossibleMatch[]>([]);
  const [absentStudents, setAbsentStudents] = useState<string[]>([]);
  const [unrecognizedStudents, setUnrecognizedStudents] = useState<string[]>([]);
  const [rawPresentCount, setRawPresentCount] = useState<number>(0);
  
  const [showResults, setShowResults] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // Mobile Navigation State
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  const processList = (text: string): string[] => {
    return text.split(/[\n,]+/).map(name => name.trim()).filter(name => name.length > 0);
  };

  const handleGenerate = useCallback(() => {
    setError('');
    if (!totalStudentsInput.trim() || !presentStudentsInput.trim()) {
      setError('Both lists must contain student names.');
      return;
    }

    const totalList = [...new Set(processList(totalStudentsInput))];
    const presentList = [...new Set(processList(presentStudentsInput))];
    
    setRawPresentCount(presentList.length);

    const matched: string[] = [];
    const possible: PossibleMatch[] = [];
    const absent: string[] = [];
    let unmatchedPresent = [...presentList];

    for (const masterName of totalList) {
        let foundMatch = false;

        // 1. Exact match
        const exactMatchIndex = unmatchedPresent.findIndex(p => p.toLowerCase() === masterName.toLowerCase());
        if (exactMatchIndex !== -1) {
            matched.push(masterName);
            unmatchedPresent.splice(exactMatchIndex, 1);
            foundMatch = true;
            continue;
        }

        // 2. Fuzzy match
        let bestMatch = { name: '', similarity: 0, index: -1 };
        unmatchedPresent.forEach((presentName, index) => {
            const similarity = levenshteinSimilarity(masterName, presentName);
            if (similarity > bestMatch.similarity) {
                bestMatch = { name: presentName, similarity, index };
            }
        });

        if (bestMatch.similarity >= similarityThreshold) {
            possible.push({ masterName, presentName: bestMatch.name, score: bestMatch.similarity });
            unmatchedPresent.splice(bestMatch.index, 1);
            foundMatch = true;
        }

        // 3. Absent
        if (!foundMatch) {
            absent.push(masterName);
        }
    }

    const unrecognized = unmatchedPresent;

    setTotalStudents(totalList);
    setMatchedStudents(matched);
    setPossibleMatches(possible);
    setAbsentStudents(absent);
    setUnrecognizedStudents(unrecognized);
    setShowResults(true);
    setActiveTab('results'); // Switch to results tab on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalStudentsInput, presentStudentsInput, similarityThreshold]);

  const handleDownload = () => {
    if (absentStudents.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "List of B.Pharm 3rd Sem students who didn't fill the form\n" 
      + absentStudents.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "absent_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (absentStudents.length === 0) return;
    
    const text = "List of B.Pharm 3rd Sem students who didn't fill the form:\n\n" + absentStudents.join("\n");
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bus Form Absentee List',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      handleCopy();
    }
  };

  const handleCopy = () => {
     if (absentStudents.length === 0) return;
     const text = "List of B.Pharm 3rd Sem students who didn't fill the form:\n\n" + absentStudents.join("\n");
     navigator.clipboard.writeText(text).then(() => {
         alert("List copied to clipboard!");
     });
  };

  const handleReset = () => {
    setPresentStudentsInput('');
    setTotalStudents([]);
    setMatchedStudents([]);
    setPossibleMatches([]);
    setAbsentStudents([]);
    setUnrecognizedStudents([]);
    setRawPresentCount(0);
    setShowResults(false);
    setError('');
    setActiveTab('input');
  };

  const restoreDefaultList = () => {
    if (window.confirm("Restore the original class list?")) {
        setTotalStudentsInput(DEFAULT_CLASS_LIST);
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900">
      <header className="flex-none bg-white dark:bg-slate-800 shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary truncate">
              Bus Form Check
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              B.Pharm 3rd Sem Verification
            </p>
          </div>
          {showResults && activeTab === 'results' && (
              <button 
                onClick={handleReset} 
                className="text-sm text-red-500 font-semibold px-3 py-1 rounded-full border border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/30 transition-colors md:hidden"
              >
                Clear
              </button>
          )}
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-grow overflow-y-auto pb-24 md:pb-6">
        <div className="container mx-auto p-4 md:p-6">
          <div className="md:grid md:grid-cols-2 md:gap-8 max-w-7xl mx-auto">
            
            {/* INPUT SECTION */}
            <div className={`${activeTab === 'input' ? 'block' : 'hidden'} md:block space-y-6`}>
              <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="space-y-6">
                  {/* Priority 1: Present Students */}
                  <StudentListInput
                    id="present-students"
                    label="Submitted Forms (Required)"
                    value={presentStudentsInput}
                    onTextChange={setPresentStudentsInput}
                    placeholder="Paste names who filled the form..."
                    icon={<UserCheckIcon />}
                  />

                  {/* Priority 2: Class List (Hidden/Collapsed by default) */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <button 
                      onClick={() => setShowClassList(!showClassList)}
                      className="flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors"
                    >
                      <UsersIcon className="w-4 h-4 mr-2" />
                      {showClassList ? 'Hide Class List' : 'Show/Edit Class List (Default Loaded)'}
                    </button>
                    
                    {showClassList && (
                      <div className="mt-4 animate-fade-in relative">
                        <StudentListInput
                          id="total-students"
                          label="Total Class List"
                          value={totalStudentsInput}
                          onTextChange={setTotalStudentsInput}
                          placeholder="Class list..."
                          icon={<UsersIcon className="w-4 h-4" />}
                        />
                        <button 
                          onClick={restoreDefaultList}
                          className="absolute top-0 right-0 mt-1 mr-1 text-xs text-primary flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-600 hover:bg-white"
                          title="Restore Original List"
                        >
                          <RefreshIcon className="w-3 h-3 mr-1" />
                          Restore Default
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Threshold Slider */}
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="threshold" className="font-semibold text-sm text-slate-700 dark:text-slate-200 flex items-center">
                      <AlertTriangleIcon className="w-4 h-4 mr-2 text-amber-500" />
                      Typo Tolerance
                    </label>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      {Math.round(similarityThreshold * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    id="threshold"
                    min="0.5"
                    max="1.0"
                    step="0.01"
                    value={similarityThreshold}
                    onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-600 accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase tracking-wide font-medium">
                    <span>Loose</span>
                    <span>Strict</span>
                  </div>
                </div>

                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!presentStudentsInput.trim()}
                    className="w-full py-3 text-lg shadow-primary/20 shadow-lg"
                  >
                    Analyze Lists
                  </Button>
                  <Button onClick={handleReset} variant="secondary" className="w-full sm:w-auto hidden md:inline-flex">
                    <TrashIcon className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            
            {/* RESULTS SECTION */}
            <div className={`${activeTab === 'results' ? 'block' : 'hidden'} md:block space-y-6`}>
              {!showResults && (
                <div className="hidden md:flex h-full items-center justify-center text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                  <div>
                    <ChartBarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Results will appear here</p>
                    <p className="text-sm">Enter student lists to generate report</p>
                  </div>
                </div>
              )}

              {showResults && (
                <div className="animate-fade-in space-y-4">
                  {/* Stats Card */}
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border-l-4 border-primary">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center">
                      <ChartBarIcon className="w-5 h-5 mr-2 text-primary" />
                      Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase">Total Students</span>
                            <span className="block text-xl font-bold text-slate-800 dark:text-slate-100">{totalStudents.length}</span>
                        </div>
                         <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase">Forms Filled</span>
                            <span className="block text-xl font-bold text-green-600 dark:text-green-400">{rawPresentCount}</span>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg col-span-2 border border-red-100 dark:border-red-900/30">
                            <span className="block text-red-600 dark:text-red-400 text-xs uppercase font-bold">Not Filled Form</span>
                            <span className="block text-2xl font-black text-red-600 dark:text-red-400">{absentStudents.length}</span>
                        </div>
                    </div>
                  </div>

                  {/* Action Buttons for Mobile */}
                  <div className="grid grid-cols-2 gap-3">
                     <Button onClick={handleShare} size="sm" variant="secondary" disabled={absentStudents.length === 0} className="w-full justify-center">
                        <ShareIcon className="w-4 h-4 mr-2" />
                        Share
                     </Button>
                     <Button onClick={handleCopy} size="sm" variant="secondary" disabled={absentStudents.length === 0} className="w-full justify-center">
                        <ClipboardIcon className="w-4 h-4 mr-2" />
                        Copy
                     </Button>
                  </div>

                  <StudentListDisplay
                    title="Students who didn't fill form"
                    students={absentStudents}
                    icon={<UserXIcon className="text-red-500" />}
                    highlightColor="red"
                    action={
                      <Button onClick={handleDownload} disabled={absentStudents.length === 0} size="sm" className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
                        <DownloadIcon className="w-4 h-4" />
                      </Button>
                    }
                  />
                  
                  {possibleMatches.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-amber-200 dark:border-amber-900/50">
                        <div className="flex items-center mb-3 text-amber-600 dark:text-amber-500">
                            <AlertTriangleIcon className="w-5 h-5 mr-2" />
                            <h3 className="font-bold">Possible Typos ({possibleMatches.length})</h3>
                        </div>
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {possibleMatches.map((match, i) => (
                                <li key={i} className="text-xs sm:text-sm bg-amber-50 dark:bg-amber-900/20 p-2 rounded flex justify-between items-center">
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-medium">{match.masterName}</span>
                                        <span className="text-[10px] text-slate-400 mx-1 hidden sm:inline">matches</span>
                                        <span className="text-slate-500 italic">{match.presentName}</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-sm border border-amber-100 dark:border-amber-900">
                                        {Math.round(match.score * 100)}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                  )}

                  <StudentListDisplay
                    title="Unrecognized / Extras"
                    students={unrecognizedStudents}
                    icon={<QuestionMarkCircleIcon />}
                    highlightColor="yellow"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 md:hidden pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('input')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'input' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500'}`}
          >
            <InputIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">Input Data</span>
          </button>
          
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>

          <button 
            onClick={() => showResults && setActiveTab('results')}
            disabled={!showResults}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${activeTab === 'results' ? 'text-primary' : 'text-slate-400'} ${!showResults && 'opacity-50 cursor-not-allowed'}`}
          >
             {showResults && <span className="absolute top-3 right-8 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
            <ChartBarIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">Results</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;